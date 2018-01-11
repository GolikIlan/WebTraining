import { ViewChild, Component, OnInit, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { Product } from '../../core/product-model/product';
import { Category, CategoriesDataService } from '../../core/product-services/categories.service';
import { ProductsDataService } from '../../core/product-services/products.service';
import { IsDirtyIndicationProvider } from '../../core/interfaces/is-dirty-indication-provider';


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

  async ngOnInit() {
    this._categories = <Array<Category>> await this._categoriesDataService.getCategories();
  }

}
