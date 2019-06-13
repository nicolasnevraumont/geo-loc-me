import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from "@angular/router";

import { Location, Coords } from '../../shared/models/location';
import { Address } from '../../shared/models/address';

import { OpenStreetMapService } from '../../shared/services/open-street-map.service';
import { FirebaseService } from '../../shared/services/firebase.service';

@Component({
  selector: 'app-log-add-form',
  templateUrl: './log-add-form.component.html',
  styleUrls: ['./log-add-form.component.scss']
})
export class LogAddFormComponent {
  comment = new FormControl('');

  constructor(private openStreetMapService: OpenStreetMapService,
              private firebaseService: FirebaseService,
              private router: Router) {
  }

  log(comment: string) {
    const location: Location = new Location();
    location.datetime = new Date();
    location.comment = comment;
    navigator.geolocation.getCurrentPosition((position) => {
      location.coords = new Coords();
      location.coords.longitude = position.coords.longitude;
      location.coords.latitude = position.coords.latitude;
      if (position.coords.altitude) {
        location.coords.altitude = position.coords.altitude;
      }
      this.openStreetMapService.getAddressFromGeocoding(location.coords.latitude, location.coords.longitude)
        .subscribe(
          (address: Address) => {
            location.address = new Address(address);
            this.firebaseService.addLocation(location).then(
              res => {
                this.router.navigate(['/logs']);
              }
            ).catch(err => console.log(err));
          }
        );
    });
  }
}
