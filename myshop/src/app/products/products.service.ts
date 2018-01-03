import { Injectable } from "@angular/core";
import { Product } from "./product";
import { PRODUCTS_FULL } from "./products.mock";
import { ProductComponent } from "../product/product.component";


@Injectable()
export class ProductsDataService{

    private _productInStockMap:Map<string, number>;

    constructor() {
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