import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class SelectionStateService{
    private _selectedMenuItem:string;
    selectedMenuItemChanged: EventEmitter<string> = new EventEmitter();


    constructor() {
        this.selectedMenuItem = "Home";
    }

    set selectedMenuItem(item:string){
        this._selectedMenuItem = item;
        this.selectedMenuItemChanged.emit(item);
    }

    get selectedMenuItem():string{
        return this._selectedMenuItem;
    }
}