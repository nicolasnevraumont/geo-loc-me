import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { AngularFireAuth } from '@angular/fire/auth';

import { Location } from "../../shared/models/location"
import { Address } from "../../shared/models/address";

import { OpenStreetMapService } from "../../shared/services/open-street-map.service";

@Component({
  selector: 'app-log-add-form',
  templateUrl: './log-add-form.component.html',
  styleUrls: ['./log-add-form.component.scss']
})
export class LogAddFormComponent {
  private itemsCollection: AngularFirestoreCollection<Location>;
  comment = new FormControl('');

  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth,
              private openStreetMapService: OpenStreetMapService) {
    this.itemsCollection = afs.collection<Location>('locations');
  }

  log(comment: string) {
    const location: any = {};
    location.datetime = Date.now();
    location.comment = comment;
    this.afAuth.user.subscribe((currentUser) => {
      location.user = currentUser.displayName;
      navigator.geolocation.getCurrentPosition((position) => {
        location.coords = {};
        location.coords.longitude = position.coords.longitude;
        location.coords.latitude = position.coords.latitude;
        this.openStreetMapService.getAddressFromGeocoding(location.coords.latitude, location.coords.longitude)
          .subscribe(
            (address: Address) => {
              location.address = { ...address };
              this.itemsCollection.add(location);
            }
          );
      });
    });
  }
}
