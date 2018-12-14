import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Component({
  selector: 'app-logs-list-view',
  templateUrl: './logs-list-view.component.html',
  styleUrls: ['./logs-list-view.component.scss']
})
export class LogsListViewComponent implements OnInit {

  items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection('locations').valueChanges();
  }

  ngOnInit() {
  }
}
