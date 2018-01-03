import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriesDataService, Category } from '../products/categories.service';
import { Product } from '../products/product';
import { ProductsDataService } from '../products/products.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {
  private _productToSave: Product;
  private _categories: Category[];

  @Output()
  closing:EventEmitter<string> = new EventEmitter<string>();

  constructor(private _categoriesDataService:CategoriesDataService, 
    private _productsService:ProductsDataService) {
      this._categories = this._categoriesDataService.getCategories();
  }

  get categories():Array<Category>{
    return this._categories;
  }

  onSubmit(form:any){

    let categoryId = form.value["categorySelection"]
    let title = form.value["title"];
    let image = form.value["image"];
    let price = form.value["price"];
    let description = form.value["description"];

    this._productToSave = new Product("255", categoryId, image, title, price, description);
  }

  onSaveResultIsReady(args:boolean){
    if(args)
    {
      this._productsService.addNewProduct(this._productToSave);
      this.closing.emit("AddNewProductComponent");
    }
  }

  cancel(){
    this.closing.emit("AddNewProductComponent");
  }

  ngOnInit() {
  }

}
