import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { Product } from '../../core/product-model/product';
import { MenuItemsProvider } from '../../core/menu-service/menuItemsProvider';
import { LoginSevice } from '../../core/login-service/loginservice';
import { SelectionStateService } from '../../core/menu-service/selectionStateService';
import { MenuItem } from '../../core/menu-item-model/menuItem';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  localizationLang: string;

  supportedLangs: { display: string; value: string; }[];
  selectedProduct: Product;
  private _selectedMenuItem: any;
  private _sideNavIsVisible: boolean;
  title = 'app';
  sideMenu:boolean;
  navMenu:boolean;

  constructor(private _menuItemsProvider : MenuItemsProvider, 
    private _loginService:LoginSevice, 
    private _selectionStateService:SelectionStateService)
  {
    this._sideNavIsVisible = false;
  }

  

  onProductSelectionChanged(product:Product){
    this.selectedMenuItem = "ProductDetails";
    this.selectedProduct = product;
  }

  closeDetails(){
    this.selectedMenuItem = "Products";
    this.selectedProduct = null;
  }

  onAddProductClosing(){
    let item:MenuItem = this._menuItemsProvider.find(item => item.title === "Products");
    if(item === undefined) return;
    this._selectionStateService.selectedMenuItem = item;
  }

  onSelectedMenuItemChanged(selectedMenuItem:MenuItem){
    this.onSelection(selectedMenuItem);
    this.closeSideNavMenu();
  }

  private onSelection(selectedMenuItem: MenuItem) {
    this.selectedMenuItem = this.selectedMenuItem === "ProductDetails" && selectedMenuItem.title === "Products" ? "ProductDetails" : selectedMenuItem.title;
  }

  public openSideNavMenu()
  {
    this.sideNavIsVisible = true;
  }

  public closeSideNavMenu()
  {
    this.sideNavIsVisible = false;
  }

  get sideNavIsVisible():boolean{
    return this._sideNavIsVisible;
  }

  set sideNavIsVisible(value:boolean){
    this._sideNavIsVisible = value;
  }


  set selectedMenuItem(value:string){
    this._selectedMenuItem = value;
  }

  get selectedMenuItem():string{
    return this._selectedMenuItem;
  }

  private initLocalization(): void {
    this.supportedLangs = [
      { display: 'english', value: 'en' },
      { display: 'русский', value: 'ru' },
      { display: 'עברית', value: 'heb' },
      ];  
      
      this.localizationSelected('en');
  }

  localizationSelected(value:string){
    this.localizationLang = value;
  }

  ngOnInit(): void {
    this.selectedMenuItem = this._menuItemsProvider.defaultSelection.title;
    this.initLocalization();
  }

  ngOnDestroy(): void {
    console.log("app components reloaded");
    /*if(this._loginSubscription === null)
    {
      return;
    }
    this._loginSubscription.unsubscribe();*/
  }
}
