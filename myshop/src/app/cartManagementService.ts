import { Injectable, EventEmitter } from "@angular/core";
import { Product } from "./products/product";
import { ProductsDataService } from "./products/products.service";
import { LoginSevice } from "./login/loginservice";



@Injectable()
export class CartManagementService{
    
    cartProductsAmountChanged: EventEmitter<number> = new EventEmitter();
    private _productsInCard:Map<string, Array<Product>>;

    constructor(private _productsDataService:ProductsDataService, 
        private _loginService:LoginSevice) {
            this._productsInCard = new Map<string, Array<Product>>();
    }

    get productsAmount():number{
        if(this._loginService.loginToken.token === undefined) return 0;
        if(this._productsInCard.has(this._loginService.loginToken.token)){
            const newLocal = this._productsInCard.get(this._loginService.loginToken.token);
            return newLocal.length;
        }
        else{
            return 0;
        }
    }

    addProductToCart(product:Product){
        if(this._productsInCard.has(this._loginService.loginToken.token)){
            let productsByToken = this._productsInCard.get(this._loginService.loginToken.token)
            productsByToken.push(product);
        }
        else{
            let arr = new Array<Product>();
            arr.push(product);
            this._productsInCard.set(this._loginService.loginToken.token, arr);
        }
        this._productsDataService.decrementStock(product);
        this.cartProductsAmountChanged.emit(this.productsAmount);
    }

    getById(id:string):Product[]{
        if(this._loginService.loginToken.token === undefined) return new Array<Product>();
        if(this._productsInCard.has(this._loginService.loginToken.token)){
            let arr = this._productsInCard.get(this._loginService.loginToken.token);
            let p = arr.filter((product) => product.productId === id);
            return p;
        }
        else{
            return new Array<Product>();
        }
    }

    removeProductFromCart(product:Product){
        if(this._productsInCard.has(this._loginService.loginToken.token)){
            const arr = this._productsInCard.get(this._loginService.loginToken.token);
            let index = arr.indexOf(product, 0);
            if (index > -1) 
            {
                arr.splice(index, 1);
                this._productsDataService.incrementStock(product);
                this.cartProductsAmountChanged.emit(this.productsAmount);
            }
        }
    }

    removeProductFromCartBySummary(cartSummaryDetails:CartSummaryDetails){
        if(this._productsInCard.has(this._loginService.loginToken.token)){
            const arr = this._productsInCard.get(this._loginService.loginToken.token);
            let product = arr.find((p) => 
            { 
                return p.productId === cartSummaryDetails.productId 
                && p.title === cartSummaryDetails.title 
                && p.price === cartSummaryDetails.price;
            });
            let index = arr.indexOf(product, 0);
            if (index > -1) 
            {
                arr.splice(index, 1);
                this._productsDataService.incrementStock(product);
                this.cartProductsAmountChanged.emit(this.productsAmount);
            }
        }

        
    }

    get summary():Array<CartSummaryDetails>{
        if(this._productsInCard.has(this._loginService.loginToken.token)){
            return this._productsInCard.get(this._loginService.loginToken.token).map((product) => 
            { 
                return new CartSummaryDetails(product.title, product.price, product.productId);
            });
        }
        return new Array<CartSummaryDetails>();
    }

}

export class CartSummaryDetails{
    constructor(public title:string, public price:number, public productId:string){

    }
}


