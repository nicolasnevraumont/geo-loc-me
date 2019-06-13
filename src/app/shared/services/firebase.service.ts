import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of } from 'rxjs/index';
import { map, flatMap, take } from 'rxjs/operators';

import { Location } from '../../shared/models/location';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private userLocationsCollectionName: Observable<string>;

  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth) {
    this.userLocationsCollectionName = this.afAuth.user.pipe(map((currentUser) => {
      if (currentUser) {
        return 'locations_' + currentUser.uid;
      } else {
        return null;
      }
    }));
  }

  public getLocations(): Observable<DocumentChangeAction<Location>[]> {
    return this.userLocationsCollectionName.pipe(flatMap((userLocationsCollectionName: string) => {
        if(userLocationsCollectionName) {
          return this.afs.collection<Location>(userLocationsCollectionName, ref =>
            ref.orderBy('datetime', 'desc')).snapshotChanges();
        } else {
          return of(null);
        }
      }
    ));
  }

  public addLocation(location: Location): Promise<DocumentReference> {
    return this.userLocationsCollectionName.pipe(flatMap((userLocationsCollectionName: string) => {
        const param = JSON.parse(JSON.stringify(location)); // firebase add does not support custom typed object
        return this.afs.collection<Location>(userLocationsCollectionName).add(param);
      }
    ), take(1)).toPromise();
  }

  public deleteLocation(location: Location): Promise<void> {
    return this.userLocationsCollectionName.pipe(flatMap((userLocationsCollectionName: string) => {
        return this.afs.collection<Location>(userLocationsCollectionName).doc(location.id).delete();
      }
    ), take(1)).toPromise();
  }
}
