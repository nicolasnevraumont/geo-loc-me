import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth, User } from 'firebase/app';
import { Router } from "@angular/router";
import { first } from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private router: Router, public afAuth: AngularFireAuth) {
  }

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(res => {
      if (this.redirectUrl) {
        this.router.navigate([this.redirectUrl]);
      } else {
        this.router.navigate(['/']); //home
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(res => this.router.navigate(['/login']));
  }

  user() {
    return this.afAuth.user;
  }

  get authenticated(): Promise<User> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
