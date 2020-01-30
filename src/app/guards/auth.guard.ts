import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;

    if (currentUser) {
      // check if route is restricted by a specific role by checking the roles array in a route
      if (route.data.roles && route.data.roles.indexOf(currentUser.role) < 0) {
        this.router.navigate(['/']);
        return false;
      }
      // authorised
      return true;
    } else {
      // user is not logged in
      this.router.navigate(['/login/v1'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}
