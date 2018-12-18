import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from "rxjs";

import { Location } from "../../shared/models/location"

@Component({
  selector: 'app-logs-list-view',
  templateUrl: './logs-list-view.component.html',
  styleUrls: ['./logs-list-view.component.scss']
})
export class LogsListViewComponent {
  private itemsCollection: AngularFirestoreCollection<Location>;
  items: Observable<Location[]>;
  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Location>('locations');
    this.items = this.itemsCollection.valueChanges();
  }

  add(location: Location) {
    this.itemsCollection.add(location);
  }
}
