import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { SelectionStateService } from './selectionStateService';
import { ISubscription } from 'rxjs/Subscription';
import { MenuItem, CartMenuItem } from '../menuItem';
import { MenuItemsProvider } from '../menuItemsProvider';
import { LocalizationService } from '../localization/localizationservise';
import { LoginSevice } from '../login/loginservice';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnDestroy, OnInit {
  private _selectedLang: any;
  supportedLangs: { display: string; value: string; }[];
  private _classes: any;
  private _subscription: ISubscription;
  private _loginSubscription: ISubscription;
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

  //{exact:true}
  getMatchingStatus(item:MenuItem):any{
    if(item.path === "product"){
      return {exact:false};
    }
    else{
      return {exact:true};
    }
  }

  menuItems:Array<MenuItem>

  @Output()
  selectedMenuItemChanged:EventEmitter<MenuItem> = new EventEmitter<MenuItem>();
  @Output()
  selectedMenuItemInitialized:EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

  constructor(private _selectionStateService:SelectionStateService, 
    private _menuItemsProvider:MenuItemsProvider, 
    private _localizationService:LocalizationService, 
    private _loginService:LoginSevice) { 
    this._isSideMenu = false;
    this._isNavMenu = false;
    this._loginSubscription = this._loginService.loginStatusChanged.subscribe((result) => {
      this.onUserLogedIn(result);
    })
  }

  onUserLogedIn(isLogedIn:boolean){
    if(isLogedIn){
      let homeMenuItem = this._menuItemsProvider.find((item) => item.title === "Home");
      this.selected(homeMenuItem);
    }
  }

  private initSelection(item: MenuItem) {
    this.currentSelectedMenuItem = item;
    this.selectedMenuItemInitialized.emit(item);
    this._subscription = this._selectionStateService.selectedMenuItemChanged.subscribe( item => {
      this.onSelection(item);
  });
  }

  get isLogedIn(){
    return this._loginService.isLogedIn;
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
    this.refreshMenu();
  }

  private refreshMenu() {
    this.menuItems = this._menuItemsProvider;
    this.initSelection(this._selectionStateService.selectedMenuItem);
  }

  @Input()
  set selectedLang(value:string){
    this._selectedLang = value;
    this.updateLang();
  }

  get selectedLang():string{
    return this._selectedLang;
  }

  private updateLang(): void {
    this._localizationService.use(this.selectedLang);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._loginSubscription.unsubscribe();
  }

}
