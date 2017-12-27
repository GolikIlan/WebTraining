import { Component, OnInit, Input } from '@angular/core';
import { Product, ProductWrapperInterface } from '../products/product';
import { CategoriesDataService, Category } from '../products/categories.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit, ProductWrapperInterface {
  private _category: Category;
  private _product: Product;

  constructor(private categoriesDataService:CategoriesDataService) { 

  }

  @Input()
  set product(value:Product){
    this._product = value;
    this._category = this.categoriesDataService.getCategories().find((category) => category.id === this._product.categoryId);
  }

  get category():Category{
    return this._category;
  }

  get product():Product{
    return this._product;
  }

  ngOnInit() {
  }

}
