import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
  MatListModule, MatInputModule, MatExpansionModule } from '@angular/material';

import { AppNavComponent } from './components/app-nav/app-nav.component';
import { LogsListViewComponent } from './components/logs-list-view/logs-list-view.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LogAddFormComponent } from './components/log-add-form/log-add-form.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { LoginComponent } from './components/login/login.component';

import { environment } from '../environments/environment';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
        MatListModule, MatInputModule, MatExpansionModule,
        RouterTestingModule,
        FormsModule, ReactiveFormsModule,
        NoopAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase, 'geo-loc-me'),
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
        AngularFireStorageModule, // imports firebase/storage only needed for storage features

      ],
      declarations: [
        AppComponent,
        AppNavComponent,
        LogsListViewComponent,
        PageNotFoundComponent,
        LogAddFormComponent,
        AuthenticationComponent,
        LoginComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
