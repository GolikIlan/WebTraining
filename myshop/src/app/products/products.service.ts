import { Injectable } from "@angular/core";
import { Product } from "./product";
import { PRODUCTS_FULL } from "./products.mock";


@Injectable()
export class ProductsDataService{

    //private _products:Array<Product>

    constructor() {

        console.log("ProductsDataService")
    }

    getProducts():Array<Product>{
        return PRODUCTS_FULL;
    }
}