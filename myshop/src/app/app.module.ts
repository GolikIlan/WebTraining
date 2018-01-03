import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AlertModule } from 'ngx-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
  ]
})
export class OwnMaterialModule {}

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
    AlertModule.forRoot(),
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
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
