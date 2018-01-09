import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserPermissionsStatusProvider } from '../permissions-service/user-permissions-status-provider';


@Injectable()
export class HasPermissionGuard implements CanActivate {

  constructor(private _userPermissionsStatusProvider:UserPermissionsStatusProvider) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this._userPermissionsStatusProvider.canCurrentUserAddNewProduct();
  }
}
