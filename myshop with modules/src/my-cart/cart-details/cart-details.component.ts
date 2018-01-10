import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/product-model/product';
import { ProductsDataService } from '../../core/product-services/products.service';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit, OnDestroy {
  private _product: Observable<Product>;
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
    this.product.map(p => console.log(`loading details ${p.productId}`));
    
  }

  set product(value:Observable<Product>) {
    this._product = value;
  }

  get product():Observable<Product>{
    return this._product;
  }

}
