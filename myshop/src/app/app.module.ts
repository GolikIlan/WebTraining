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
import { AnchorwrapperComponent } from './anchorwrapper/anchorwrapper.component';
import { CartManagementService } from './cartManagementService';
import { MenuItemsProvider } from './menuItemsProvider';
import { CartComponent } from './cart/cart.component';
import { CartaddingwrapperComponent } from './cartaddingwrapper/cartaddingwrapper.component';
import { CartlineComponent } from './cartline/cartline.component';
import { EndoflinebuttonComponent } from './endoflinebutton/endoflinebutton.component';
import { LocalizationService } from './localization/localizationservise';
import { LocalizationPipe } from './localization/localization.pipe';
import { LOCALIZATION_PROVIDERS } from './localization/localizationinfra';
import { TitleCasePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProductsComponent,
    HeaderComponent,
    ProductComponent,
    ClosebuttonComponent,
    ProductdetailsComponent,
    AnchorwrapperComponent,
    CartComponent,
    CartaddingwrapperComponent,
    CartlineComponent,
    EndoflinebuttonComponent,
    LocalizationPipe,
  ],
  imports: [
    BrowserModule, AngularFontAwesomeModule
  ],
  providers: [CategoriesDataService, ProductsDataService, SelectionStateService, MenuItemsProvider, CartManagementService, LocalizationService, LOCALIZATION_PROVIDERS, TitleCasePipe,],
  bootstrap: [AppComponent]
})
export class AppModule { }
