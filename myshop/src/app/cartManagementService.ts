import { Injectable, EventEmitter } from "@angular/core";
import { Product } from "./products/product";
import { ProductsDataService } from "./products/products.service";



@Injectable()
export class CartManagementService{
    
    cartProductsAmountChanged: EventEmitter<number> = new EventEmitter();
    private _productsInCard:Array<Product>;

    constructor(private _productsDataService:ProductsDataService) {
        this._productsInCard = new Array<Product>();
    }

    get productsAmount():number{
        return this._productsInCard.length;
    }

    addProductToCart(product:Product){
        this._productsInCard.push(product);
        this._productsDataService.decrementStock(product);
        this.cartProductsAmountChanged.emit(this.productsAmount);
    }

    getById(id:string){
        return this._productsInCard.filter((product) => product.productId === id);
    }

    removeProductFromCart(product:Product){
        var index = this._productsInCard.indexOf(product, 0);
        if (index > -1) 
        {
            this._productsInCard.splice(index, 1);
            this._productsDataService.incrementStock(product);
            this.cartProductsAmountChanged.emit(this.productsAmount);
        }
    }

    get summary():Array<CartSummaryDetails>{
        return this._productsInCard.map((product) => 
        { 
            return new CartSummaryDetails(product.title, product.price, product.productId);
        });
    }

}

export class CartSummaryDetails{
    constructor(public title:string, public price:number, public productId:string){

    }
}