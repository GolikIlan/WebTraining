import { Injectable, Pipe } from "@angular/core";

import { CartManagementService } from "../cart-service/cartManagementService";
import { LoginSevice } from "../login-service/loginservice";
import { UserPermissionsStatusProvider } from "../permissions-service/user-permissions-status-provider";
import { MenuItem, CartMenuItem, LoginMenuItem, LogoutMenuItem, AddProductMenuItem } from "../menu-item-model/menuItem";


@Injectable()
export class MenuItemsProvider extends Array<MenuItem>{
    private _defaultSelection: MenuItem;

    constructor(cartManagementService : CartManagementService, 
        loginService:LoginSevice, private _userPermissionsStatusProvider:UserPermissionsStatusProvider) {
        super();
        this.defaultSelection = new MenuItem("Home", true, "home");
        this.push(this.defaultSelection);
        this.push(new MenuItem("About", true, "about"));
        this.push(new MenuItem("Products", true, "products"));
        this.push(new MenuItem("Contacts", true, "contacts"));
        this.push(new LoginMenuItem("Login", loginService, "login"));
        this.push(new LogoutMenuItem("Logout", loginService, "logout"));
        this.push(new AddProductMenuItem("Add New Product", loginService, _userPermissionsStatusProvider, "add"));
        this.push(new MenuItem("Send Message", true, "send"));
        this.push(new CartMenuItem("Cart", cartManagementService, loginService, "cart"));
    }

    get defaultSelection():MenuItem{
        return this._defaultSelection;
    }

    set defaultSelection(value:MenuItem){
        this._defaultSelection = value;
    }

}