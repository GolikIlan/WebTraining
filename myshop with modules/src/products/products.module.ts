import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { CartaddingwrapperComponent } from './cartaddingwrapper/cartaddingwrapper.component';
import { ProductComponent } from './product/product.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { ProductsComponent } from './products/products.component';
import { RouterModule } from '@angular/router';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule,
  ],
  exports:[
    AddNewProductComponent, 
    CartaddingwrapperComponent, 
    ProductComponent,
    ProductdetailsComponent,
    ProductsComponent,
   ],
  declarations: [
    AddNewProductComponent, 
    CartaddingwrapperComponent, 
    ProductComponent,
    ProductdetailsComponent,
    ProductsComponent
  ]
})
export class ProductsModule { }
