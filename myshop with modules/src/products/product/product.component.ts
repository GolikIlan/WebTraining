import { Component, Input, OnDestroy } from '@angular/core';
import { ProductWrapperInterface, Product } from '../../core/product-model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnDestroy, ProductWrapperInterface {

  private _product: Product;

  constructor() { }

  @Input()
  set product(value:Product){
    this._product = value;
  }

  get product():Product{
    return this._product;
  }

  ngOnDestroy(): void {
    
  }
}
