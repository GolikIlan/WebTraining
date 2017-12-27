import { Component } from '@angular/core';
import { Product } from './products/product';
import { MenuItem } from './menuItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedProduct: Product;
  private _selectedMenuItem: any;
  private _sideNavIsVisible: boolean;
  title = 'app';
  sideMenu:boolean;
  navMenu:boolean;

  constructor()
  {
    this._sideNavIsVisible = false;
    this.sideMenu = true;
    this.navMenu = true;
  }

  onProductSelectionChanged(product:Product){
    this.selectedMenuItem = "ProductDetails";
    this.selectedProduct = product;
  }

  closeDetails(){
    this.selectedMenuItem = "Products";
    this.selectedProduct = null;
  }

  onSelectedMenuItemChanged(selectedMenuItem:MenuItem){
    this.selectedMenuItem = this.selectedMenuItem === "ProductDetails" && selectedMenuItem.title === "Products" ? "ProductDetails" : selectedMenuItem.title;
    this.closeSideNavMenu();
  }

  public openSideNavMenu()
  {
    this._sideNavIsVisible = true;
  }

  public closeSideNavMenu()
  {
    this._sideNavIsVisible = false;
  }

  get sideMavIsVisible():boolean{
    return this._sideNavIsVisible;
  }


  set selectedMenuItem(value:string){
    this._selectedMenuItem = value;
  }

  get selectedMenuItem():string{
    return this._selectedMenuItem;
  }
}
