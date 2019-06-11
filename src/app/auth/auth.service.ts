import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private router: Router, public afAuth: AngularFireAuth) {
  }

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut().then(res => this.router.navigate(['/login']));
  }

  user() {
    return this.afAuth.user;
  }

  /* https://angularfirebase.com/lessons/router-guards-to-redirect-unauthorized-firebase-users/ */

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.afAuth.authState !== null;
  }
}
