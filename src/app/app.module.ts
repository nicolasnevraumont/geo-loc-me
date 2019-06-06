import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { LogsListViewComponent } from './components/logs-list-view/logs-list-view.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LogAddFormComponent } from './components/log-add-form/log-add-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
  MatListModule, MatInputModule, MatIconRegistry, MatExpansionModule } from '@angular/material';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AuthenticationComponent } from './components/authentication/authentication.component';

const appRoutes: Routes = [
  { path: 'logs', component: LogsListViewComponent },
  { path: 'logs/add', component: LogAddFormComponent },
  { path: '',   redirectTo: '/logs/add', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LogsListViewComponent,
    PageNotFoundComponent,
    LogAddFormComponent,
    AppNavComponent,
    AuthenticationComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'geo-loc-me'),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    NoopAnimationsModule, LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
    MatListModule, MatInputModule, MatExpansionModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FormsModule, ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [MatIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule { }
