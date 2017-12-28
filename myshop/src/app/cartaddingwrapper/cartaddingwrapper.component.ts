import { Component, OnInit, ContentChild, AfterContentInit } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { Product, ProductWrapperInterface } from '../products/product';
import { ProductsDataService } from '../products/products.service';
import { CartManagementService } from '../cartManagementService';

@Component({
  selector: 'app-cartaddingwrapper',
  templateUrl: './cartaddingwrapper.component.html',
  styleUrls: ['./cartaddingwrapper.component.css']
})
export class CartaddingwrapperComponent implements OnInit, AfterContentInit {
  private _product: Product;

  @ContentChild('productWrapperInterface') _projectedProductComponent:ProductWrapperInterface;

  constructor(private _productsDataService:ProductsDataService, private _cartManagementService:CartManagementService) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this._product = this._projectedProductComponent.product;
  }

  addToCart(args:any){
    args.stopPropagation();
    if(this.productInStock)
    {
      this._cartManagementService.addProductToCart(this._product);
    }
  }

  removeFromCart(args:any){
    args.stopPropagation();
    this._cartManagementService.removeProductFromCart(this._product);
  }

  get productInStock():boolean{
    return this._productsDataService.isInStock(this._product);
  }

  get productAmount():number{
    let array = this._cartManagementService.getById(this._product.productId);
    return array.length;
  }

}
