import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";

import { Location, GeoPoint, Timestamp } from "../../shared/models/location"

@Component({
  selector: 'app-log-add-form',
  templateUrl: './log-add-form.component.html',
  styleUrls: ['./log-add-form.component.scss']
})
export class LogAddFormComponent {
  private itemsCollection: AngularFirestoreCollection<Location>;
  comment = new FormControl('');

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Location>('locations');
  }

  log(comment: string) {
    const location: any = {};
    location.comment = comment;
    location.datetime = {};
    location.datetime.seconds = Math.floor(Date.now() / 1000);
    navigator.geolocation.getCurrentPosition((position) => {
      location.location = {};
      location.location.latitude = position.coords.latitude;
      location.location.longitude = position.coords.longitude;
    });
    console.log(location);
    this.itemsCollection.add(location);
  }
}
