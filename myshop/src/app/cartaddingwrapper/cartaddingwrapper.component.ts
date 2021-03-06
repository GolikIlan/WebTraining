import { Component, OnInit, ContentChild, AfterContentInit } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { Product, ProductWrapperInterface } from '../products/product';
import { ProductsDataService } from '../products/products.service';
import { CartManagementService } from '../cartManagementService';
import { LoginSevice } from '../login/loginservice';
import { TargetDirective } from './target-id-directive';

@Component({
  selector: 'app-cartaddingwrapper',
  templateUrl: './cartaddingwrapper.component.html',
  styleUrls: ['./cartaddingwrapper.component.css']
})
export class CartaddingwrapperComponent implements OnInit, AfterContentInit {
  private _product: Product;

  @ContentChild(TargetDirective) _projectedProductComponent:TargetDirective;

  constructor(private _productsDataService:ProductsDataService, 
    private _cartManagementService:CartManagementService, 
    private _loginSevice:LoginSevice) { }

  ngOnInit() {
  }

  get isLogedIn():boolean{
    return this._loginSevice.isLogedIn;
  }

  ngAfterContentInit() {
    this._product = this._projectedProductComponent.target;
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
