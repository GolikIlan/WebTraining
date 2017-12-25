import { Component, OnInit, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { Product } from '../products/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  private _product: Product;

  constructor() { }

  @Input()
  set product(value:Product){
    this._product = value;
  }

  get product():Product{
    return this._product;
  }
}
