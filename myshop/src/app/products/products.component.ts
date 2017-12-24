import { Component, OnInit } from '@angular/core';
import { Category, CategoriesDataService } from './categories.service';
import {ProductsDataService } from './products.service';
import { Product } from './product';
import { ProductComponent } from '../product/product.component';
import { fail } from 'assert';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private _products: Product[];
  private _selectedCategory: Category;
  selectedProduct: Product;
  detailsShouldBePresented:boolean;
  categories:Array<Category>;

  constructor(private categoriesDataService:CategoriesDataService,
     private productsDataService:ProductsDataService) { 
       this.detailsShouldBePresented = false;
     }

  productSelected(product:Product){
    this.detailsShouldBePresented = true;
    this.selectedProduct = product;
  }

  handleClick(event){
    
  }

  categorySelected(category:Category){
    this.selectedCategory = category;
  }

  set selectedCategory(category:Category){
    this._selectedCategory = category;
  }

  get selectedCategory():Category{
    return this._selectedCategory;
  }

  get products():Array<Product>{
    return this._products.filter((product) => {
      if(this._selectedCategory.id === "all") 
      {
        return true;
      }
      return product.categoryId === this._selectedCategory.id});
  }

  closeDetails(){
    this.detailsShouldBePresented = false;
  }

  ngOnInit() {
    this._products = this.productsDataService.getProducts();
    this.categories = this.categoriesDataService.getCategories();
    this.selectedCategory = this.categories.find((category) => category.id === "all");
  }

}
