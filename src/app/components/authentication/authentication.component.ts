import { Component } from '@angular/core';

import { Observable } from 'rxjs/index';
import { User } from "firebase";

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {

  constructor(private authService: AuthService) {
  }

  get user(): Observable<User> {
    return this.authService.user;
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
