import { Inject } from "@angular/core";
import { PERMISSIONS } from "./permissions";

export class PermissionServise{

    constructor(@Inject(PERMISSIONS) private _permissions: any) {
    }

    hasPermissionForAction(token:LoginToken, issue:string, action:string):boolean{
        let permisionsForToken = this._permissions[token.token];
        if(permisionsForToken === undefined) return false;
        let grantedActions = permisionsForToken[issue];
        if(grantedActions === undefined) return;
        let hasPermission = grantedActions[action];
        return hasPermission === undefined ? false : hasPermission;
    }

}

export class LoginToken{
    private _token: string;

    constructor(private _userName:string, private _password:string) {
        this._token = `${this._userName}^${this._password}`;
    }

    get token():string{
        return this._token;
    }
}

export class NullLoginToken extends LoginToken{

    constructor() {
        super("","");
        
    }

    get token():string{
        return undefined;
    }
}