import { Injectable, EventEmitter } from "@angular/core";
import { ProductsDataService } from "../product-services/products.service";
import { Product } from "../product-model/product";
import { LoginSevice } from "../login-service/loginservice";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";



@Injectable()
export class CartManagementService{    
    cartProductsAmountChanged: EventEmitter<number> = new EventEmitter();

    private _subject:BehaviorSubject<Array<CartSummaryDetails>>;
    private _observableSummary:Observable<Array<CartSummaryDetails>>;

    private _productsInCart:Map<string, Array<Product>>;

    constructor(private _productsDataService:ProductsDataService, 
        private _loginService:LoginSevice) {
            this._productsInCart = new Map<string, Array<Product>>();
            this._subject = new BehaviorSubject([]);
            this._observableSummary = this._subject.asObservable();
            this._loginService.loginStatusChanged.subscribe(args => {
                this.updateSummary();
            })
    }

    get productsAmount():number{
        const token = this._loginService.loginToken;
        console.log(token.token);
        if(token.token === undefined) return 0;
        console.log(token.token);
        if(this._productsInCart.has(token.token)){
            const newLocal = this._productsInCart.get(this._loginService.loginToken.token);
            return newLocal.length;
        }
        else{
            return 0;
        }
    }

    addProductToCart(product:Product){
        const loginToken = this._loginService.loginToken;
        console.log(loginToken.token);
        if(this._productsInCart.has(loginToken.token)){
            let productsByToken = this._productsInCart.get(loginToken.token)
            productsByToken.push(product);
            console.log("added");
        }
        else{
            let arr = new Array<Product>();
            arr.push(product);
            this._productsInCart.set(loginToken.token, arr);
            console.log("added");
        }
        this._productsDataService.decrementStock(product);
        this.cartProductsAmountChanged.emit(this.productsAmount);
        this.updateSummary();
    }

    private updateSummary() {
        this._subject.next(this.getSummary());
    }

    getById(id:string):Product[]{
        if(this._loginService.loginToken.token === undefined) return new Array<Product>();
        if(this._productsInCart.has(this._loginService.loginToken.token)){
            let arr = this._productsInCart.get(this._loginService.loginToken.token);
            let p = arr.filter((product) => product.productId === id);
            return p;
        }
        else{
            return new Array<Product>();
        }
    }

    removeProductFromCart(product:Product){
        if(this._productsInCart.has(this._loginService.loginToken.token)){
            const arr = this._productsInCart.get(this._loginService.loginToken.token);
            let index = arr.indexOf(product, 0);
            if (index > -1) 
            {
                arr.splice(index, 1);
                this._productsDataService.incrementStock(product);
                this.cartProductsAmountChanged.emit(this.productsAmount);
                this.updateSummary();
            }
        }
    }

    removeProductFromCartBySummary(cartSummaryDetails:CartSummaryDetails){
        if(this._productsInCart.has(this._loginService.loginToken.token)){
            const arr = this._productsInCart.get(this._loginService.loginToken.token);
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
                this.updateSummary();
            }
        }

        
    }

    get summary():Observable<Array<CartSummaryDetails>>{
        return this._observableSummary;
    }

    private getSummary(): Array<CartSummaryDetails> {
        if(this._productsInCart.has(this._loginService.loginToken.token)){
            return this._productsInCart.get(this._loginService.loginToken.token).map((product) => 
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


