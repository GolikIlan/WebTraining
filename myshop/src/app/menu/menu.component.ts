import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { SelectionStateService } from './selectionStateService';
import { ISubscription } from 'rxjs/Subscription';
import { MenuItem, CartMenuItem } from '../menuItem';
import { MenuItemsProvider } from '../menuItemsProvider';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnDestroy, OnInit {
  private _subscription: ISubscription;
  currentSelectedMenuItem: MenuItem;
  private _isNavMenu: boolean;
  private _isSideMenu:boolean;
  classes:any;

  menuItems:Array<MenuItem>

  @Output()
  selectedMenuItemChanged:EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

  constructor(private _selectionStateService:SelectionStateService, private _menuItemsProvider:MenuItemsProvider) { 
    this._isSideMenu = false;
    this._isNavMenu = false;
  }

  ngOnDestroy(): void {
    if(this._subscription === null)
    {
      return;
    }
    this._subscription.unsubscribe();
  }

  private initSelection(item: MenuItem) {
    this.onSelection(item);
    this._subscription = this._selectionStateService.selectedMenuItemChanged.subscribe( item => {
      this.onSelection(item);
  });
  }

  selected(item:MenuItem){
    this._selectionStateService.selectedMenuItem = item;
  }

  isMenuItem(item:MenuItem){
    if(item instanceof CartMenuItem){
      return false;
    }
    return true;
  }

  private onSelection(item: MenuItem) {
    this.selectedMenuItemChanged.emit(item);
    this.currentSelectedMenuItem = item;
  }

  get isSideMenu():boolean{
    return this._isSideMenu;
  }

  @Input()
  set isSideMenu(value:boolean){
    this._isSideMenu = value;
    this.classes = {
      mySideMenu: this._isNavMenu,
      myLeftPanMenu: this._isSideMenu,
    };
  }

  @Input()
  set isNavMenu(value:boolean){
    this._isNavMenu = value;
    this.classes = {
      mySideMenu: this._isNavMenu,
      myLeftPanMenu: this._isSideMenu,
    };
  }

  get isNavMenu():boolean{
    return this._isNavMenu;
  }

  ngOnInit() {
    this.menuItems = this._menuItemsProvider;
    this.initSelection(this._selectionStateService.selectedMenuItem);
  }

}
