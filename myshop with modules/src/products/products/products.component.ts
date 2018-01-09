import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { Product } from '../../core/product-model/product';
import { Category, CategoriesDataService } from '../../core/product-services/categories.service';
import { ProductsDataService } from '../../core/product-services/products.service';
import { NavigationManagerService } from '../../core/navigation_service/navigation-manager-service';

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

  @Output()
  productSelectionChanged:EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private _categoriesDataService:CategoriesDataService,
      private _productsDataService:ProductsDataService,
      private _navigationManagerService:NavigationManagerService) { 
       this.detailsShouldBePresented = false;
     }

  productSelected(product:Product){
    this.selectedProduct = product;
    this.goToSelectedProduct(product);
    this.productSelectionChanged.emit(this.selectedProduct);
  }

  goToSelectedProduct(product:Product): void {
    this._navigationManagerService.navigateTo(["products", `${product.productId}`]);
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
    this._products = this._productsDataService.getProducts();
    this.categories = this._categoriesDataService.getCategories();
    this.selectedCategory = this.categories.find((category) => category.id === "all");
  }
}
