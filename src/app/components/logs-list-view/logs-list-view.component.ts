import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from "rxjs";

import * as L from 'leaflet';

import { Coords, Location } from "../../shared/models/location"

@Component({
  selector: 'app-logs-list-view',
  templateUrl: './logs-list-view.component.html',
  styleUrls: ['./logs-list-view.component.scss']
})
export class LogsListViewComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Location>;
  items: Observable<Location[]>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Location>('locations');
    this.items = this.itemsCollection.valueChanges();
  }

  add(location: Location) {
    this.itemsCollection.add(location);
  }

  private readonly myIcon: any = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
  });

  private myMap: any;

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.myMap = L.map('map').setView([position.coords.latitude, position.coords.longitude], 16);

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Frugal Map'
      }).addTo(this.myMap);

      L.marker([position.coords.latitude, position.coords.longitude], {icon: this.myIcon}).bindPopup('I\'m here!').addTo(this.myMap).openPopup();
    });
  }

  showOnMap(comment: string, coords: Coords) {
    this.myMap = this.myMap.setView([coords.latitude, coords.longitude], 16);
    L.marker([coords.latitude, coords.longitude], {icon: this.myIcon}).bindPopup(comment).addTo(this.myMap).openPopup();
  }
}
