import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { SelectionStateService } from './selectionStateService';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnDestroy, OnInit {
  private _subscription: ISubscription;
  currentSelectedMenuItem: string;
  private _isNavMenu: boolean;
  private _isSideMenu:boolean;
  classes:any;

  menuItems  = [
    "Home",
    "About", 
    "Products", 
    "Contacts",
  ];

  @Output()
  selectedMenuItemChanged:EventEmitter<any> = new EventEmitter<any>();

  constructor(private _selectionStateService:SelectionStateService) { 
    this._isSideMenu = false;
    this._isNavMenu = false;
    this.initSelection(this._selectionStateService.selectedMenuItem);
  }

  ngOnDestroy(): void {
    if(this._subscription === null)
    {
      return;
    }
    this._subscription.unsubscribe();
  }

  private initSelection(item: string) {
    this.onSelection(item);
    this._subscription = this._selectionStateService.selectedMenuItemChanged.subscribe( item => {
      this.onSelection(item);
  });
  }

  selected(item:any){
    this._selectionStateService.selectedMenuItem = item;
  }

  private onSelection(item: any) {
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
  }

}
