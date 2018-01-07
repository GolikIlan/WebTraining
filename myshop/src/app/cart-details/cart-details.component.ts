import { Component, OnInit } from '@angular/core';
import { ProductsDataService } from '../products/products.service';
import { ActivatedRoute } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { Product } from '../products/product';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit, OnDestroy {
  private _product: Product;
  private _routeSubscription:ISubscription;

  constructor(private _productsDataService:ProductsDataService, private _route: ActivatedRoute) {
   }

  ngOnInit() {
    this._routeSubscription = this._route.paramMap.subscribe(params => {
      let productId = params.get('id');
      this.loadDetails(productId);
    });
  }

  ngOnDestroy(): void {
    this._routeSubscription.unsubscribe();
  }

  loadDetails(productId:string): void {
    this.product = this._productsDataService.getProductById(productId);
    console.log(`loading details ${productId}`);
    console.log(`loading details ${this.product.productId}`);
  }

  set product(value:Product) {
    this._product = value;
  }

  get product():Product{
    return this._product;
  }

}
