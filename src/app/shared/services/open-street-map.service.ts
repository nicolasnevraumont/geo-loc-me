import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Address, OpenStreetMapResponse } from '../models/address'

@Injectable({
  providedIn: 'root'
})
export class OpenStreetMapService {

  constructor(private http: HttpClient) { }

  getAddressFromGeocoding(lat: number, lon: number): Observable<Address> {
    return this.http.get<OpenStreetMapResponse>(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`).pipe(map((res) => res.address));
  }
}
