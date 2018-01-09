import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';
import { CanExitNotSavedRouteGuard } from '../shared/guards/can-exit-add-new-route.guard';
import { AuthGuard } from '../core/guards/auth.guard';
import { HasPermissionGuard } from '../core/guards/has-permission.guard';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';

const routes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: 'add', canDeactivate:[CanExitNotSavedRouteGuard] ,canActivate:[AuthGuard, HasPermissionGuard], component:AddNewProductComponent},
  {path: 'products/:id', canDeactivate:[CanExitNotSavedRouteGuard],component: ProductdetailsComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
