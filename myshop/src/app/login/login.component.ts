import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginSevice, LoginData, LoginResult } from './loginservice';
import { NavigationManagerService } from '../navigation-manager-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _form: any;
  private _userName:string;
  private _password:string;


  constructor(private _loginService:LoginSevice, 
    private _navigationManagerService:NavigationManagerService) { }

  get password():string{
    return this._password;
  }

  set password(value:string){
    this._password = value;
    this.resetErrors()
  }

  get userName():string{
    return this._userName;
  }

  set userName(value:string){
    this._userName = value;
    this.resetErrors()
  }

  resetErrors(): any {
    if(this._form === null || this._form === undefined)
    {
      return;
    }
    this._form.controls['userName'].setErrors(null);
  }

  onSubmit(form:any){
    let result = this._loginService.login(new LoginData(this.userName, this.password));
    let resultString = LoginResult[result];
    this._form = form;
    if(resultString === LoginResult[LoginResult.Failed]){
      form.controls['userName'].setErrors({'incorrect': true});
    }
    else if(resultString === LoginResult[LoginResult.LogedIn]){
      form.controls['userName'].setErrors(null);
      form.reset();
      this._navigationManagerService.navigateTo(["home"]);
    }
  }

  ngOnInit() {
  }

}
