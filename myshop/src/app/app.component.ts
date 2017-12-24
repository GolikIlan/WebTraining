import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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

  onSelectedMenuItemChanged(selectedMenuItem:any){
    this.selectedMenuItem = selectedMenuItem;
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


  set selectedMenuItem(value:any){
    this._selectedMenuItem = value;
  }

  get selectedMenuItem():any{
    return this._selectedMenuItem;
  }
}
