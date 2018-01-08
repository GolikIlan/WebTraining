import { ViewChild, Component, OnInit, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { CategoriesDataService, Category } from '../products/categories.service';
import { Product } from '../products/product';
import { ProductsDataService } from '../products/products.service';
import { FormGroup } from '@angular/forms/src/model';
import { AfterContentInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { IsDirtyIndicationProvider } from '../is-dirty-indication-provider';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit, AfterViewInit, IsDirtyIndicationProvider {

  private _childForm: any;
  private _productToSave: Product;
  private _categories: Category[];

  @ViewChild("addForm") form:ElementRef

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

  ngAfterViewInit(): void {
    this._childForm = this.form;
  }

  isDirty():boolean{
    return this._childForm.dirty === true;
  }


  onSaveResultIsReady(args:boolean){
    if(args)
    {
      this._productsService.addNewProduct(this._productToSave);
      this._childForm.reset();
    }
  }

  reset(){
    this._childForm.reset();
  }

  ngOnInit() {
  }

}
