import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesDataService } from './product-services/categories.service';
import { ProductsDataService } from './product-services/products.service';
import { SelectionStateService } from './menu-service/selectionStateService';
import { MenuItemsProvider } from './menu-service/menuItemsProvider';
import { CartManagementService } from './cart-service/cartManagementService';
import { LocalizationService } from './localization-service/localizationservise';
import { LOCALIZATION_PROVIDERS } from './localization-service/localizationinfra';
import { CREDENTIALS_PROVIDERS } from './login-service/credentials';
import { LoginSevice } from './login-service/loginservice';
import { PERMISSIONS_PROVIDERS } from './permissions-service/permissions';
import { PermissionServise } from './permissions-service/permissionservice';
import { UserPermissionsStatusProvider } from './permissions-service/user-permissions-status-provider';
import { NavigationManagerService } from './navigation_service/navigation-manager-service';
import { AuthGuard } from './guards/auth.guard';
import { HasPermissionGuard } from './guards/has-permission.guard';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PRODUCTS_PROVIDERS_MOCK, ProductsProviderHttpBased } from './product-services/products.mock';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from '../core/interceptors/logging-interceptor';

@NgModule({
  imports: [
    CommonModule, FormsModule, RouterModule,
  ],
  providers: [
    ProductsDataService, 
    SelectionStateService, 
    MenuItemsProvider,
    CartManagementService, 
    LocalizationService, 
    LOCALIZATION_PROVIDERS, 
    CREDENTIALS_PROVIDERS,
    LoginSevice,
    PERMISSIONS_PROVIDERS,
    PermissionServise,
    UserPermissionsStatusProvider,
    NavigationManagerService,
    AuthGuard, 
    HasPermissionGuard,
    CategoriesDataService,
    PRODUCTS_PROVIDERS_MOCK,
    ProductsProviderHttpBased, 
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
        throw new Error(`CoreModule has already been loaded. Import core modules in AppModule only.`);
    }
}
}
