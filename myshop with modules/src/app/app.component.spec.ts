import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProductsDataService } from '../core/product-services/products.service';
import { SelectionStateService } from '../core/menu-service/selectionStateService';
import { MenuItemsProvider } from '../core/menu-service/menuItemsProvider';
import { CartManagementService } from '../core/cart-service/cartManagementService';
import { LocalizationService } from '../core/localization-service/localizationservise';
import { LOCALIZATION_PROVIDERS } from '../core/localization-service/localizationinfra';
import { CREDENTIALS_PROVIDERS } from '../core/login-service/credentials';
import { LoginSevice } from '../core/login-service/loginservice';
import { PERMISSIONS_PROVIDERS } from '../core/permissions-service/permissions';
import { PermissionServise } from '../core/permissions-service/permissionservice';
import { UserPermissionsStatusProvider } from '../core/permissions-service/user-permissions-status-provider';
import { NavigationManagerService } from '../core/navigation_service/navigation-manager-service';
import { AuthGuard } from '../core/guards/auth.guard';
import { HasPermissionGuard } from '../core/guards/has-permission.guard';
import { CategoriesDataService, CategoriesDataServiceMock } from '../core/product-services/categories.service';
import { PRODUCTS_PROVIDERS_MOCK, ProductsProviderHttpBased, ProductsProvider } from '../core/product-services/products.mock';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from '../core/interceptors/logging-interceptor';
import { TitleCasePipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { HeaderComponent } from '../shared/header/header.component';
import { MenuComponent } from '../shared/menu/menu.component';
import { ClosebuttonComponent } from '../shared/closebutton/closebutton.component';
import { LocalizationPipe } from '../shared/localization/localization.pipe';
import { AnchorwrapperComponent } from '../shared/anchorwrapper/anchorwrapper.component';
import { HomeComponent } from '../shared/home/home.component';
import { appModuleRoutes } from './app.routing.module';
import { LoginComponent } from '../shared/login/login.component';
import { LogoutComponent } from '../shared/logout/logout.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsModule } from '../products/products.module';


describe('AppComponent', () => {
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [ AppComponent, MainLayoutComponent, AnchorwrapperComponent, LocalizationPipe, ClosebuttonComponent, MenuComponent,  HeaderComponent, HomeComponent],
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
        TitleCasePipe,
        HasPermissionGuard,
        PRODUCTS_PROVIDERS_MOCK,
        ProductsProvider,
        { provide: CategoriesDataService, useClass: CategoriesDataServiceMock, multi: false }, 
        { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },

      ]
    })
    .compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as 'MainLayoutComponent' as a content`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.mainLayout).toBeTruthy();
  }));
});
