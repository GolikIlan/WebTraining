import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../shared/home/home.component';
import { LogoutComponent } from '../shared/logout/logout.component';
import { AboutComponent } from '../shared/about/about.component';
import { SendMessageComponent } from '../shared/send-message/send-message.component';
import { ContactsComponent } from '../shared/contacts/contacts.component';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';
import { LoginComponent } from '../shared/login/login.component';
import { ProductsComponent } from '../products/products/products.component';
import { CanExitNotSavedRouteGuard } from '../shared/guards/can-exit-add-new-route.guard';
import { AuthGuard } from '../core/guards/auth.guard';
import { HasPermissionGuard } from '../core/guards/has-permission.guard';
//import { AddNewProductComponent } from '../products/add-new-product/add-new-product.component';
import { Routes } from '@angular/router';

//cart
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'about', component: AboutComponent},
  {path: 'send', component: SendMessageComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'cart', canActivate:[AuthGuard], loadChildren: '../my-cart/cart.module#CartModule'},
  {path: 'login', component:LoginComponent},
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{
}