import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ProductsComponent } from './products/products.component';
import { HeaderComponent } from './header/header.component';
import { CategoriesDataService } from './products/categories.service';
import { ProductsDataService } from './products/products.service';
import { ProductComponent } from './product/product.component';
import { ClosebuttonComponent } from './closebutton/closebutton.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { SelectionStateService } from './menu/selectionStateService';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProductsComponent,
    HeaderComponent,
    ProductComponent,
    ClosebuttonComponent,
    ProductdetailsComponent,
  ],
  imports: [
    BrowserModule, AngularFontAwesomeModule
  ],
  providers: [CategoriesDataService, ProductsDataService, SelectionStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
