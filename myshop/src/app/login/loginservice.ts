import { Injectable, Inject, EventEmitter } from "@angular/core";
import { CREDENTIALS } from "./credentials";
import { fail } from "assert";
import { LoginToken, NullLoginToken } from "../permissions/permissionservice";



@Injectable()
export class LoginSevice{
    private _noLoggedInToken: LoginToken = new NullLoginToken();
    private _token: LoginToken;
    private _isLogedIn: boolean;
    constructor(@Inject(CREDENTIALS) private _credentials: any) {
        this._isLogedIn = false;
        this._token = this._noLoggedInToken;
    }

    loginStatusChanged: EventEmitter<boolean> = new EventEmitter();

    get isLogedIn():boolean{
        return this._isLogedIn;
    }

    get loginToken():LoginToken{
        return this._token;
    }

    login(loginData:LoginData):LoginResult{
        const userName = this._credentials[loginData.password];
        if(userName !== undefined && userName === loginData.userName)
            {
                this._isLogedIn = true;
                this._token = new LoginToken(loginData.userName, loginData.password);
                this.loginStatusChanged.emit(this._isLogedIn);
                return LoginResult.LogedIn;
            }
            return LoginResult.Failed;
    }

    logOut(){
        if(this.isLogedIn === false) return;
        this._isLogedIn = false;
        this._token = this._noLoggedInToken;
        this.loginStatusChanged.emit(this._isLogedIn)
    }
}


export class LoginData{

    constructor(public userName:string, public password:string) {
    }
}

export enum LoginResult{
    LogedIn,
    Failed
}