import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart/cart.component';
import { CartlineComponent } from './cartline/cartline.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CartRoutingModule,
    CommonModule,
  ],
  declarations: [
    CartComponent, 
    CartlineComponent, 
    CartDetailsComponent,
  ],
  /*exports:[
    CartComponent, 
    CartlineComponent, 
    CartDetailsComponent,
  ]*/
})
export class CartModule { }
