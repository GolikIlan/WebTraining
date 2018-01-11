import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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

    constructor(private _http:HttpClient) {
    }
    
    getCategories():Promise<Array<Category>>{
        return  this._http.get('./assets/categories.json')
        .map(response => {
            let result = <Array<Category>>response["data"];
            return result;})
        .toPromise();
    }
}


export class CategoriesDataServiceMock{
    private _categories:Array<Category> = [
      new Category("1", "Foods"), 
      new Category("2", "Clothes"), 
      new Category("5", "Home"), 
      new Category("4", "Electronics"), 
      new Category("3", "Children"), 
      new Category("all", "All"),]
  
  
  getCategories():Promise<Array<Category>>{
    return new Promise<Array<Category>>(resolve =>
      setTimeout(resolve, 2000))
      .then(() => this._categories);
  }
  }