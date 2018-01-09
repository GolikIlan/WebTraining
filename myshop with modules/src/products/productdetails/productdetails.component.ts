import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ISubscription } from 'rxjs/Subscription';
import { Product, ProductWrapperInterface } from '../../core/product-model/product';
import { Category, CategoriesDataService } from '../../core/product-services/categories.service';
import { UserPermissionsStatusProvider } from '../../core/permissions-service/user-permissions-status-provider';
import { ProductsDataService } from '../../core/product-services/products.service';
import { NavigationManagerService } from '../../core/navigation_service/navigation-manager-service';
import { IsDirtyIndicationProvider } from '../../core/interfaces/is-dirty-indication-provider';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit, AfterViewInit,ProductWrapperInterface, IsDirtyIndicationProvider {
  private _childForm: any;
  private _navigationSubscription: ISubscription;
  private _productToEdit: Product;
  private _categories: Category[];
  private _isInEditMode: boolean;
  private _editPermission: boolean;
  private _product: Product;

  @ViewChild("editForm") form:ElementRef

  @Output()
  closing:EventEmitter<string> = new EventEmitter<string>();

  constructor(private _categoriesDataService:CategoriesDataService, 
    private _userPermissionsStatusProvider:UserPermissionsStatusProvider,
    private _activatedRoute:ActivatedRoute, 
    private _productsService:ProductsDataService,
    private _navigationManagerService:NavigationManagerService) {
      this._isInEditMode = false;
      this._categories = this._categoriesDataService.getCategories();
  }

  ngAfterViewInit(): void {
    this._childForm = this.form;
  }

  isDirty():boolean{
    this._childForm = this.form;
    if(this._childForm === undefined){
      return false;
    }
    return this._childForm.dirty === true;
  }

  @Input()
  set product(value:Product){
    this._product = value;
  }

  get product():Product{
    return this._product;
  }

  closeDetails(){
    this.closing.emit("ProductdetailsComponent");
    this._navigationManagerService.navigateTo(["products"]);

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

  edit(){
    this._isInEditMode = true;
  }

  closeEdit(){
    this._isInEditMode = false;
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

  private loadProduct(id:string): any {
    this.product = this._productsService.getProductById(id);
  }

  ngOnInit() {
    this._navigationSubscription = this._activatedRoute.paramMap.subscribe(param => {
      let productId = param.get('id');
      this.loadProduct(productId);
    });
    this._editPermission = this._userPermissionsStatusProvider.canCurrentUserEditProductDetails()
  }

}
