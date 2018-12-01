import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

// Auth Gaurd Service to check if perticulat user is authnticated to use the route
// NOT using now as no roles/ Authentication are defined/ required

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
  ) {}

  canActivate(): boolean {
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, nextState: RouterStateSnapshot): boolean {
    return true;
  }
}

interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGaurd implements CanDeactivate<CanComponentDeactivate> {
  constructor() {}

  canDeactivate(component: CanComponentDeactivate,
           route: ActivatedRouteSnapshot,
           state: RouterStateSnapshot,
           nextState?: RouterStateSnapshot) {

    const allowRoute = true;

    return allowRoute;
  }
}
