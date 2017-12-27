import { Component, OnInit, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { Product, ProductWrapperInterface } from '../products/product';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

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
