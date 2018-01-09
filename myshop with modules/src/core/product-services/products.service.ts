import { Injectable } from "@angular/core";
import { PRODUCTS_FULL } from "./products.mock";
import { UserPermissionsStatusProvider } from "../permissions-service/user-permissions-status-provider";
import { Product } from "../product-model/product";



@Injectable()
export class ProductsDataService{

    private _productInStockMap:Map<string, number>;

    constructor(private _userPermissionsStatusProvider:UserPermissionsStatusProvider) {
        this._productInStockMap = new Map<string, number>();
        this.initStock();
    }

    private initStock(): any {
        for (const product of PRODUCTS_FULL) {
            this._productInStockMap.set(product.productId, 7);
        }
    }

    getProducts():Array<Product>{
        return PRODUCTS_FULL;
    }

    getProductById(id:string){
        return PRODUCTS_FULL.find(product => product.productId  === id);
    }

    addNewProduct(product:Product){
        product.productId = `${PRODUCTS_FULL.length + 1}`;
        this._productInStockMap.set(product.productId, 7);
        PRODUCTS_FULL.push(product)
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