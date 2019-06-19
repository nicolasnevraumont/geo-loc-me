import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as L from 'leaflet';

import { Location } from '../../shared/models/location';
import { Map } from '../../shared/models/map';

import { FirebaseService } from '../../shared/services/firebase.service';

@Component({
  selector: 'app-logs-list-view',
  templateUrl: './logs-list-view.component.html',
  styleUrls: ['./logs-list-view.component.scss']
})
export class LogsListViewComponent implements OnInit, OnDestroy {
  items: Observable<Location[]>;

  private readonly myIcon: any = L.icon({
    iconUrl: 'assets/icons/baseline-location_on.svg'
  });
  private maps: Map[] = [];

  showSpinner: boolean = true;

  constructor(private firebaseService: FirebaseService) {
  }

  ngOnInit() {
    this.items = this.firebaseService.getLocations().pipe(map(actions => {
      if (actions) {
        return actions.map(a => {
          const data = new Location(a.payload.doc.data());
          data.id = a.payload.doc.id;
          return data;
        });
      } else {
        return [];
      }
    }));
    this.items.subscribe(() => this.showSpinner = false);
  }

  ngOnDestroy() {
    // by security, release memory if map was not removed from closing expandable panel
    this.maps.forEach((existingMap: Map) => this.destroyMap(existingMap.id));
  }

  delete(item: Location) {
    if (confirm('Do you really want to delete this log?')) {
      this.firebaseService.deleteLocation(item).then(
        res => {
          this.destroyMap(item.id);
        }
      );
    }
  }

  generateMap(item: Location) {
    // check if not already generated
    if (this.maps.find((existingMap: Map) => existingMap.id === item.id) == null) {

      // initialise map
      let os_map: any = L.map('map' + item.id);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Geo Low Me Map'
      }).addTo(os_map);

      // move to location and add marker
      os_map.setView([item.coords.latitude, item.coords.longitude], 12);
      let marker: any = L.marker([item.coords.latitude, item.coords.longitude], { icon: this.myIcon }).bindPopup(item.comment).addTo(os_map);
      if (item.comment) {
        marker.openPopup();
      }

      // add to component memory
      const map: Map = new Map();
      map.id = item.id;
      map.os_map = os_map;
      this.maps.push(map);
    }
  }

  destroyMap(id: string) {
    const existingMap: Map = this.maps.find((existingMap: Map) => existingMap.id === id);
    if (existingMap !== null) {
      existingMap.os_map.remove();
      this.maps = this.maps.filter((existingMap: Map) => existingMap.id !== id);
    }
  }
}
