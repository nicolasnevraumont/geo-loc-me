import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

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
  selectedItem: Location = null;
  hoveredItem: Location = null;

  private myMap: any;
  private marker: any = null;
  private readonly myIcon: any = L.icon({
    // iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    iconUrl: 'assets/icons/baseline-location_on.svg'
  });

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Location>('locations', ref =>
      ref.orderBy('datetime', 'desc'));
    this.items = this.itemsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Location;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  /*
  add(location: Location) {
    this.itemsCollection.add(location);
  }
  */

  ngOnInit() {
    // initialise map
    this.myMap = L.map('map');
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map'
    }).addTo(this.myMap);

    // show first location (last registered) by default
    this.items.subscribe((locations: Location[]) => {
      this.showOnMap(locations[0]);
    });
  }

  showOnMap(item: Location) {
    // set location item as selected one
    this.selectedItem = item;

    // clear previous marker
    if (this.marker) {
      this.myMap.removeLayer(this.marker);
    }

    // move to new location and add related marker
    this.myMap.setView([item.coords.latitude, item.coords.longitude], 12);
    this.marker = L.marker([item.coords.latitude, item.coords.longitude], { icon: this.myIcon }).bindPopup(item.comment).addTo(this.myMap).openPopup();
  }

  isSelected(item: Location): boolean {
    return this.selectedItem !== null && item.id === this.selectedItem.id;
  }

  hover(item: Location) {
    this.hoveredItem = item;
  }

  isHovered(item: Location): boolean {
    return this.hoveredItem !== null && item.id === this.hoveredItem.id;
  }

  delete(item: Location) {
    this.itemsCollection.doc(item.id).delete();
  }
}
