import { Injectable, EventEmitter } from "@angular/core";
import { MenuItem } from "../menuItem";
import { MenuItemsProvider } from "../menuItemsProvider";

@Injectable()
export class SelectionStateService{
    private _selectedMenuItem:MenuItem;
    selectedMenuItemChanged: EventEmitter<MenuItem> = new EventEmitter();


    constructor(private _menuItemsProvider:MenuItemsProvider) {
        this.selectedMenuItem = this._menuItemsProvider.defaultSelection;
    }

    set selectedMenuItem(item:MenuItem){
        this._selectedMenuItem = item;
        this.selectedMenuItemChanged.emit(item);
    }

    get selectedMenuItem():MenuItem{
        return this._selectedMenuItem;
    }
}