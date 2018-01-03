import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product, ProductWrapperInterface } from '../products/product';
import { CategoriesDataService, Category } from '../products/categories.service';
import { UserPermissionsStatusProvider } from '../login/user-permissions-status-provider';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit, ProductWrapperInterface {
  private _productToEdit: Product;
  private _categories: Category[];
  private _isInEditMode: boolean;
  private _editPermission: boolean;
  private _product: Product;

  @Output()
  closing:EventEmitter<string> = new EventEmitter<string>();

  constructor(private _categoriesDataService:CategoriesDataService, 
    private _userPermissionsStatusProvider:UserPermissionsStatusProvider) {
      this._isInEditMode = false;
      this._categories = this._categoriesDataService.getCategories();
  }

  @Input()
  set product(value:Product){
    this._product = value;
  }

  closeDetails(){
    this.closing.emit("ProductdetailsComponent");
  }

  get categories():Array<Category>{
    return this._categories;
  }

  setNewCategory(category:any){
    console.log(category);
  }

  get category():Category{
    return this._categories.find((category) => category.id === this._product.categoryId);
  }

  get product():Product{
    return this._product;
  }

  edit(){
    this._isInEditMode = true;
  }

  onSubmit(form:any){
    let categoryId = form.value["categorySelection"]
    let title = form.value["title"];
    let image = form.value["image"];
    let price = form.value["price"];
    let description = form.value["description"];

    this._productToEdit = new Product("255", categoryId, image, title, price, description);
  }

  onSaveResultIsReady(result:boolean){
    if(result){
      this._product.categoryId = this._productToEdit.categoryId;
      this._product.price = this._productToEdit.price;
      this._product.title = this._productToEdit.title;
      this._product.description = this._productToEdit.description;
      this._product.image = this._productToEdit.image;
    }
    this._isInEditMode = false;
  }

  get canEdit():boolean{
    return this._editPermission;
  }

  get IsInEditMode():boolean{
    return this._isInEditMode;
  }

  ngOnInit() {
    this._editPermission = this._userPermissionsStatusProvider.canCurrentUserEditProductDetails()
  }

}
