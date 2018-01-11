import { Product } from "../product-model/product";
import { InjectionToken, Injectable } from "@angular/core";
import { ProductsRoutingModule } from "../../products/products-routing.module";
import { HttpClient } from '@angular/common/http';

export class ProductsProvider{
    private _products:Array<Product> =  [
        new Product("1", "1", "./assets/images/food.jpg", "Apples", 2.50, 
        "Apples - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."), 
        new Product("2", "1", "./assets/images/food.jpg", 
        "Bananas", 3.50, "Bananas - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."), 
        new Product("3","1", "./assets/images/food.jpg", 
        "Cheese", 4.50, "Cheese - - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."), 
        new Product("4","1", "./assets/images/food.jpg", "Dark Choclate", 5.50, "Dark Choclate - - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."), 
        new Product("5","1", "./assets/images/food.jpg", "Eggs", 1.50, "Eggs - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."), 
    
        new Product("6","2", "./assets/images/clothes.jpg", "Shirt", 1.50, "Shirt - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."), 
        new Product("7","2", "./assets/images/clothes.jpg", "T-Shirt", 1.50, "T-Shirt - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."), 
        new Product("8","2", "./assets/images/clothes.jpg", "Pans", 1.50, "Pans - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."), 
     
        new Product("9","3", "./assets/images/children-Car-Toy.jpg", "Car-Toy", 1.50, "Car - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."), 
        new Product("10","3", "./assets/images/children-Doll-Toy.jpg", "Doll-Toy", 1.50, "Doll - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."),
        
        new Product("11","4", "./assets/images/tv.jpg", "TV", 1.50, "TV - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."),
        new Product("12","4", "./assets/images/fridge.jpg", "Fridge", 1.50, "Fridge - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."),
    
        new Product("13","5", "./assets/images/carpet.jpg", "Carpet", 1.50, "Carpet - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."), 
        new Product("14","5", "./assets/images/table.jpg", "Table", 1.50, "Table - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."), 
        new Product("15","5", "./assets/images/cup.jpg", "Cup", 1.50, "Cup - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."),
    ];

    async getProducts():Promise<Array<Product>>{
        return new Promise<Array<Product>>(resolve =>
            setTimeout(resolve, 0))
            .then(() => this._products);
    }
}

/*       return  this._http.get('./assets/products.json')
        .map(response => <Array<Product>>response.json().data)
        .toPromise(); */

const products_empty:Array<Product> = [];
const provider:ProductsProvider = new ProductsProvider();

export const PRODUCTS_FULL = new InjectionToken<ProductsProvider>('products');
export const PRODUCTS_EMPTY = new InjectionToken('empty_products')

export const PRODUCTS_PROVIDERS_MOCK = [
    { provide: PRODUCTS_FULL,  useValue:provider },
    { provide: PRODUCTS_EMPTY, useValue:products_empty},
];


@Injectable()
export class ProductsProviderHttpBased extends ProductsProvider{
    constructor(private _http:HttpClient) {
        super();
    }

    async getProducts():Promise<Array<Product>>{
        return  this._http.get('./assets/products.json')
        .map(response => {
            let result = <Array<Product>>response["data"];
            return result;
        })
        .toPromise();
    }
}




