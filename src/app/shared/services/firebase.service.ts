import { Injectable } from '@angular/core';

import { AngularFirestore, DocumentChangeAction, DocumentReference } from "@angular/fire/firestore";
import { AngularFireAuth } from '@angular/fire/auth';

import { Location } from '../../shared/models/location';
import { Observable } from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth) {
  }

  public getLocations(): Observable<DocumentChangeAction<Location>[]> {
    return this.afs.collection<Location>('locations', ref =>
      ref.orderBy('datetime', 'desc')).snapshotChanges()
  }

  public addLocation(location: Location): Promise<DocumentReference> {
    const param = JSON.parse(JSON.stringify(location)); // firebase add does not support custom typed object
    return this.afs.collection<Location>('locations').add(param);
  }

  public deleteLocation(location: Location): Promise<void> {
    return this.afs.collection<Location>('locations').doc(location.id).delete();
  }
}
