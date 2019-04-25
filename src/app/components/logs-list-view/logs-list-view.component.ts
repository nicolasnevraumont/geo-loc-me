import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from "rxjs";

import { Coords, Location } from "../../shared/models/location"

declare var ol: any;

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

  latitude: number = 18.5204;
  longitude: number = 73.8567;

  map: any;

  ngOnInit() {
    var mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(4),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'
    });


    this.map = new ol.Map({
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }).extend([mousePositionControl]),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([73.8567, 18.5204]),
        zoom: 8
      })
    });

    this.map.on('click', function (args) {
      console.log(args.coordinate);
      var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
      console.log(lonlat);

      var lon = lonlat[0];
      var lat = lonlat[1];
      alert(`lat: ${lat} long: ${lon}`);
    });
  }

  showOnMap(coords: Coords) {
    var view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([coords.longitude, coords.latitude]));
    view.setZoom(12);
  }
}
