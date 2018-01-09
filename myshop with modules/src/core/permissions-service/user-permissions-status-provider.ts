import { Injectable } from "@angular/core";
import { LoginSevice } from "../login-service/loginservice";
import { PermissionServise } from "./permissionservice";

@Injectable()
export class UserPermissionsStatusProvider{

    constructor(private _loginSevice:LoginSevice, 
        private _permissionServise:PermissionServise) {
    }

    canCurrentUserEditProductDetails():boolean{
        if(this._loginSevice.loginToken.token === undefined) return false;
        let hasPermission = this._permissionServise.hasPermissionForAction(this._loginSevice.loginToken, "products", "edit")
        return hasPermission;
    }

    canCurrentUserAddNewProduct():boolean{
        if(this._loginSevice.loginToken.token === undefined) return false;
        let hasPermission = this._permissionServise.hasPermissionForAction(this._loginSevice.loginToken, "products", "add")
        return hasPermission;
    }
}