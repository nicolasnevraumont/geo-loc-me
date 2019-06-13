import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Promise<boolean> {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): Promise<boolean> {
    return this.authService.authenticated.then(user => {
        if( user) {
          return true;
        } else {
          // Store the attempted URL for redirecting
          this.authService.redirectUrl = url;

          // Navigate to the login page
          this.router.navigate(['/login']);
          return false;
        }
      });
  }
}
