import { Injectable } from "@angular/core";
import { MenuItem, CartMenuItem, LoginMenuItem, LogoutMenuItem, AddProductMenuItem } from "./menuItem";
import { CartManagementService } from "./cartManagementService";
import { LoginSevice } from "./login/loginservice";
import { UserPermissionsStatusProvider } from "./login/user-permissions-status-provider";

/*{name:"Home"},
    {name:"About"},
    {name:"Products"},
    {name:"Contacts"},
    {name:"Cart", amount:10}, */

@Injectable()
export class MenuItemsProvider extends Array<MenuItem>{
    private _defaultSelection: MenuItem;

    constructor(cartManagementService : CartManagementService, 
        loginService:LoginSevice, private _userPermissionsStatusProvider:UserPermissionsStatusProvider) {
        super();
        this.defaultSelection = new MenuItem("Home", true);
        this.push(this.defaultSelection);
        this.push(new MenuItem("About", true));
        this.push(new MenuItem("Products", true));
        this.push(new MenuItem("Contacts", true));
        this.push(new LoginMenuItem("Login", loginService));
        this.push(new LogoutMenuItem("Logout", loginService));
        this.push(new AddProductMenuItem("Add New Product", loginService, _userPermissionsStatusProvider));
        this.push(new MenuItem("Send Message", true));
        this.push(new CartMenuItem("Cart", cartManagementService, loginService));
    }

    get defaultSelection():MenuItem{
        return this._defaultSelection;
    }

    set defaultSelection(value:MenuItem){
        this._defaultSelection = value;
    }

}