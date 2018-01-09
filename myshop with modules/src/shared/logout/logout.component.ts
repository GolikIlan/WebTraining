import { Component, OnInit } from '@angular/core';
import { LoginSevice } from '../../core/login-service/loginservice';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _loginService:LoginSevice) { }

  ngOnInit() {
    this._loginService.logOut();
  }

}
