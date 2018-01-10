import { Injectable } from "@angular/core";

export class Category{
    constructor(public id:string, public title:string) {

    }
}

@Injectable()
export class CategoriesDataService{
    private _categories:Array<Category> = [
        new Category("1", "Foods"), 
        new Category("2", "Clothes"), 
        new Category("5", "Home"), 
        new Category("4", "Electronics"), 
        new Category("3", "Children"), 
        new Category("all", "All"),]
    
    getCategories():Array<Category>{
        return this._categories;
    }
}