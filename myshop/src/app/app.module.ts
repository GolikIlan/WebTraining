import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AlertModule } from 'ngx-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from "@angular/router";

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

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
import { LoginComponent } from './login/login.component';
import { CREDENTIALS_PROVIDERS } from './login/credentials';
import { LoginSevice } from './login/loginservice';
import { PermissionServise } from './permissions/permissionservice';
import { PERMISSIONS_PROVIDERS } from './permissions/permissions';
import { TargetDirective } from './cartaddingwrapper/target-id-directive';
import { UserPermissionsStatusProvider } from './login/user-permissions-status-provider';
import { NumberValidationDirective } from './number-validation-directive';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { SaveDialogComponent } from './save-dialog/save-dialog.component';
import { CdkTableModule } from '@angular/cdk/table';
import { SaveOnClickDialogProviderDirective, SendOnClickDialogProviderDirective } from './save-directive';
import { SendMessageComponent } from './send-message/send-message.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LogoutComponent } from './logout/logout.component';
import { NavigationManagerService } from './navigation-manager-service';
import { HasPermissionGuard } from './has-permission.guard';
import { AuthGuard } from './auth.guard';
import { CartDetailsComponent } from './cart-details/cart-details.component';


@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  declarations: [CartDetailsComponent],
})
export class OwnMaterialModule {}


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'logout', component: LogoutComponent},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'send', component: SendMessageComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'products/:id', component:ProductdetailsComponent},
  {path: 'products', component:ProductsComponent},
  {path: 'add', canActivate:[AuthGuard, HasPermissionGuard], component:AddNewProductComponent},
  {path: 'cart', canActivate:[AuthGuard], component:CartComponent},
  {path: 'login', component:LoginComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent, 
    AboutComponent, 
    ContactsComponent,
    LogoutComponent,
    PageNotFoundComponent,
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
    LoginComponent,
    NumberValidationDirective,
    TargetDirective,
    AddNewProductComponent,
    SaveDialogComponent,
    SaveOnClickDialogProviderDirective,
    SendMessageComponent,
    SendOnClickDialogProviderDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OwnMaterialModule, 
    AngularFontAwesomeModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  entryComponents: [SaveDialogComponent],
  providers: [
    CategoriesDataService, 
    ProductsDataService, 
    SelectionStateService, 
    MenuItemsProvider,
     CartManagementService, 
     LocalizationService, 
     LOCALIZATION_PROVIDERS, 
     TitleCasePipe,
     CREDENTIALS_PROVIDERS,
     LoginSevice,
     PERMISSIONS_PROVIDERS,
     PermissionServise,
     UserPermissionsStatusProvider,
     NavigationManagerService,
     AuthGuard, 
     HasPermissionGuard,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
