import { Injectable } from "@angular/core";
import { MenuItem, CartMenuItem } from "./menuItem";
import { CartManagementService } from "./cartManagementService";

/*{name:"Home"},
    {name:"About"},
    {name:"Products"},
    {name:"Contacts"},
    {name:"Cart", amount:10}, */

@Injectable()
export class MenuItemsProvider extends Array<MenuItem>{
    private _defaultSelection: MenuItem;

    constructor(cartManagementService : CartManagementService) {
        super();
        this.defaultSelection = new MenuItem("Home");
        this.push(this.defaultSelection);
        this.push(new MenuItem("About"));
        this.push(new MenuItem("Products"));
        this.push(new MenuItem("Contacts"));
        this.push(new CartMenuItem("Cart", cartManagementService));
    }

    get defaultSelection():MenuItem{
        return this._defaultSelection;
    }

    set defaultSelection(value:MenuItem){
        this._defaultSelection = value;
    }

}