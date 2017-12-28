import { Component, OnInit } from '@angular/core';
import { CartManagementService, CartSummaryDetails } from '../cartManagementService';
import { ISubscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  totalAmount: number;
  totalPrice: any;

  whenAmountChanged(): any {
    throw new Error("Method not implemented.");
  }
  private _subscription: ISubscription;
  private _summary: CartSummaryDetails[];

  constructor(private _cartManagementService:CartManagementService) { 
    this._subscription = this._cartManagementService.cartProductsAmountChanged.subscribe( amount => {
      this._summary = this._cartManagementService.summary;
      this.totalPrice = this.getTotalPrice();
      this.totalAmount = this._summary.length;
  });
  }

  get products():Array<CartSummaryDetails>{
    return this._summary;
  }

  ngOnInit() {
    this._summary = this._cartManagementService.summary;
    this.totalPrice = this.getTotalPrice();
    this.totalAmount = this._summary.length;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  deleteButtonPressed(parameter:any){
    let details = <CartSummaryDetails> parameter;
    this._cartManagementService.removeProductFromCartBySummary(details);
  }

  private getTotalPrice():number{
    let total = 0;
    for (const details of this._summary) {
      total += details.price;
    }
    return total;
  }

}
