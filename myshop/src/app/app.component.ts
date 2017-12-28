import { Component } from '@angular/core';
import { Product } from './products/product';
import { MenuItem } from './menuItem';
import { MenuItemsProvider } from './menuItemsProvider';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  selectedProduct: Product;
  private _selectedMenuItem: any;
  private _sideNavIsVisible: boolean;
  title = 'app';
  sideMenu:boolean;
  navMenu:boolean;

  constructor(private _menuItemsProvider : MenuItemsProvider)
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

  ngOnInit(): void {
    this.selectedMenuItem = this._menuItemsProvider.defaultSelection.title;
  }
}
