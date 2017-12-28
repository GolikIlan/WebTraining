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
  private _classes: any;
  private _subscription: ISubscription;
  currentSelectedMenuItem: MenuItem;
  private _isNavMenu: boolean;
  private _isSideMenu:boolean;
  
  @Input()
  set classes(value:any){
    this._classes = value;
  }

  get classes(){
    return this._classes
  }

  menuItems:Array<MenuItem>

  @Output()
  selectedMenuItemChanged:EventEmitter<MenuItem> = new EventEmitter<MenuItem>();
  @Output()
  selectedMenuItemInitialized:EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

  constructor(private _selectionStateService:SelectionStateService, private _menuItemsProvider:MenuItemsProvider) { 
    this._isSideMenu = false;
    this._isNavMenu = false;
  }

  private initSelection(item: MenuItem) {
    this.currentSelectedMenuItem = item;
    this.selectedMenuItemInitialized.emit(item);
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

  ngOnInit() {
    this.menuItems = this._menuItemsProvider;
    this.initSelection(this._selectionStateService.selectedMenuItem);
  }

  ngOnDestroy(): void {
    if(this._subscription === null)
    {
      return;
    }
    this._subscription.unsubscribe();
  }

}
