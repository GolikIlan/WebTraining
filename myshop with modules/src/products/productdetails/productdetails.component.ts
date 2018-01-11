import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ISubscription } from 'rxjs/Subscription';
import { Product, ProductWrapperInterface } from '../../core/product-model/product';
import { Category, CategoriesDataService } from '../../core/product-services/categories.service';
import { UserPermissionsStatusProvider } from '../../core/permissions-service/user-permissions-status-provider';
import { ProductsDataService } from '../../core/product-services/products.service';
import { NavigationManagerService } from '../../core/navigation_service/navigation-manager-service';
import { IsDirtyIndicationProvider } from '../../core/interfaces/is-dirty-indication-provider';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit, AfterViewInit, IsDirtyIndicationProvider {
  private _childForm: any;
  private _navigationSubscription: ISubscription;
  private _productToEdit: Product;
  private _categories: Category[];
  private _isInEditMode: boolean;
  private _editPermission: boolean;
  private _product: Observable<Product>;

  @ViewChild("editForm") form:ElementRef

  @Output()
  closing:EventEmitter<string> = new EventEmitter<string>();

  constructor(private _categoriesDataService:CategoriesDataService, 
    private _userPermissionsStatusProvider:UserPermissionsStatusProvider,
    private _activatedRoute:ActivatedRoute, 
    private _productsService:ProductsDataService,
    private _navigationManagerService:NavigationManagerService) {
      this._isInEditMode = false;
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
  set product(value:Observable<Product>){
    this._product = value;
  }

  get product():Observable<Product>{
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

  get category():Observable<Category>{
    return this.product.map(p => this._categories.find((category) => category.id === p.categoryId));
  }

  edit(){
    this._isInEditMode = true;
  }

  closeEdit(){
    this._isInEditMode = false;
  }

  onSubmit(form:any){
    let categoryId = form.value["categorySelection"];
    let title = form.value["title"];
    let image = form.value["image"];
    let price = form.value["price"];
    let description = form.value["description"];

    this._productToEdit = new Product("255", categoryId, image, title, price, description);
  }

  get isReady():boolean{
    return this.product !== undefined && this.product !== null;
  }

  onSaveResultIsReady(result:boolean){
    if(result){
      let sub = this.product.map(p => {
        p.categoryId = this._productToEdit.categoryId;
        p.price = this._productToEdit.price;
        p.title = this._productToEdit.title;
        p.description = this._productToEdit.description;
        p.image = this._productToEdit.image;
        return p;
      }).subscribe(p => {
        let s = new BehaviorSubject<Product>(p);
        this.product = s.asObservable();
      });
      sub.unsubscribe();
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

  async ngOnInit() {
    this._categories = <Array<Category>> await this._categoriesDataService.getCategories();
    this._editPermission = this._userPermissionsStatusProvider.canCurrentUserEditProductDetails()
    this._navigationSubscription = this._activatedRoute.paramMap.subscribe(param => {
      let productId = param.get('id');
      this.loadProduct(productId);
    });
  }

}
