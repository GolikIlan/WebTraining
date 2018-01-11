import { Injectable, Inject } from "@angular/core";
import { PRODUCTS_FULL, ProductsProviderHttpBased, ProductsProvider } from "./products.mock";
import { UserPermissionsStatusProvider } from "../permissions-service/user-permissions-status-provider";
import { Product } from "../product-model/product";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";




@Injectable()
export class ProductsDataService{

    private _subject:BehaviorSubject<Array<Product>>;
    private _observabProducts:Observable<Array<Product>>;
    private _products: Product[];

    private _productInStockMap:Map<string, number>;

    constructor(products: ProductsProvider) {
        this._subject = new BehaviorSubject<Array<Product>>([]);
        this._observabProducts = this._subject.asObservable();
            
        this.init(products);
    }

    private async init(products: any) {
        this._products = <Array<Product>> await products.getProducts();
        this._productInStockMap = new Map<string, number>();
        this.initStock();
        this._subject.next(this._products);
    }


    private initStock(): any {
        for (const product of this._products) {
            this._productInStockMap.set(product.productId, 7);
        }
    }

    getProducts():Observable<Array<Product>>{
        return this._observabProducts;
    }

    getProductById(id:string):Observable<Product>{
        let result:Observable<Product>;
        let sub = this.getProducts().
            filter(products => products.length > 0).
            map(products => products.find(product => product.productId === id)).subscribe(product => {
                let s = new BehaviorSubject<Product>(product);
                result = s.asObservable();
            });
        sub.unsubscribe();
        return result;
    }

    addNewProduct(product:Product){
        product.productId = `${this._products.length + 1}`;
        this._productInStockMap.set(product.productId, 7);
        this._products.push(product)
        this._subject.next(this._products);
    }

    incrementStock(product:Product){
        if(this._productInStockMap.has(product.productId)){
            let currentAmount = this._productInStockMap.get(product.productId)
            this._productInStockMap.set(product.productId, currentAmount+1);
        }
        else{
            throw new Error('fatal error the product was not presented in the stock');
        }
    }

    decrementStock(product:Product){
        if(this._productInStockMap.has(product.productId)){
            let currentAmount = this._productInStockMap.get(product.productId)
            this._productInStockMap.set(product.productId, currentAmount-1);
        }
        else{
            throw new Error('fatal error the product was not presented in the stock');
        }
    }

    isInStock(product:Product){
        let isPresentedInStock = this._productInStockMap.has(product.productId);
        let moreThanZero = this._productInStockMap.get(product.productId) > 0;
        return isPresentedInStock && moreThanZero;
    }
}