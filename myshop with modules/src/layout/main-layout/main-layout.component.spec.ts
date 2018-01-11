import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayoutComponent } from './main-layout.component';
import { ProductsDataService } from '../../core/product-services/products.service';
import { SelectionStateService } from '../../core/menu-service/selectionStateService';
import { MenuItemsProvider } from '../../core/menu-service/menuItemsProvider';
import { CartManagementService } from '../../core/cart-service/cartManagementService';
import { LocalizationService } from '../../core/localization-service/localizationservise';
import { LOCALIZATION_PROVIDERS } from '../../core/localization-service/localizationinfra';
import { CREDENTIALS_PROVIDERS } from '../../core/login-service/credentials';
import { LoginSevice } from '../../core/login-service/loginservice';
import { PERMISSIONS_PROVIDERS } from '../../core/permissions-service/permissions';
import { PermissionServise } from '../../core/permissions-service/permissionservice';
import { UserPermissionsStatusProvider } from '../../core/permissions-service/user-permissions-status-provider';
import { NavigationManagerService } from '../../core/navigation_service/navigation-manager-service';
import { AuthGuard } from '../../core/guards/auth.guard';
import { HasPermissionGuard } from '../../core/guards/has-permission.guard';
import { CategoriesDataService, Category, CategoriesDataServiceMock } from '../../core/product-services/categories.service';
import { PRODUCTS_PROVIDERS_MOCK, ProductsProviderHttpBased, ProductsProvider } from '../../core/product-services/products.mock';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from '../../core/interceptors/logging-interceptor';
import { SharedModule } from '../../shared/shared.module';
import { AppModule } from '../../app/app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuComponent } from '../../shared/menu/menu.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { ClosebuttonComponent } from '../../shared/closebutton/closebutton.component';
import { LocalizationPipe } from '../../shared/localization/localization.pipe';
import { AnchorwrapperComponent } from '../../shared/anchorwrapper/anchorwrapper.component';
import { TitleCasePipe } from '@angular/common';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [ MainLayoutComponent, AnchorwrapperComponent, LocalizationPipe, ClosebuttonComponent, MenuComponent,  HeaderComponent, ],
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
        { provide: CategoriesDataService, useClass: CategoriesDataServiceMock, multi: true }, 
        { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
