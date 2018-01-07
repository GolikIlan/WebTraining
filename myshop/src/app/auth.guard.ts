import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginSevice } from './login/loginservice';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _loginService:LoginSevice, private _router:Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      if(this._loginService.isLogedIn === false){
        this._router.navigate(["login"])
        return false;
      }
    return true;
  }
}
