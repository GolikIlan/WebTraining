import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { CartManagementService, CartSummaryDetails } from '../cartManagementService';
import { ISubscription } from 'rxjs/Subscription';
import { OnDestroy, AfterContentChecked } from '@angular/core/src/metadata/lifecycle_hooks';
import { Product } from '../products/product';
import { NavigationManagerService } from '../navigation-manager-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  isHidden: boolean;
  private _isRedyForRouting: boolean;

  selecteId: string;
  private _selectedProduct: CartSummaryDetails;
  totalAmount: number;
  totalPrice: any;

  whenAmountChanged(): any {
    throw new Error("Method not implemented.");
  }
  private _subscription: ISubscription;
  private _summary: CartSummaryDetails[];

  constructor(private _cartManagementService:CartManagementService, private _navigationManager:NavigationManagerService,
    private _route:ActivatedRoute) { 
      this._isRedyForRouting = false;
      this.isHidden = true;
    this._subscription = this._cartManagementService.cartProductsAmountChanged.subscribe( amount => {
      this._summary = this._cartManagementService.summary;
      this.totalPrice = this.getTotalPrice();
      this.totalAmount = this._summary.length;
  });
  }

  routerOutletLoaded(){
    setTimeout(() => {
      this.navigateOnSelection();
    }, 10);
  }

  lineSelected(args:string){
    this.selecteId  = args;
    this.isHidden = false;
    this.navigateOnSelectionById(this.selecteId);
    console.log(`selected ${this.selecteId}`);
  }

  navigateOnSelection(): any {
    const id = this.selecteId;
    let navigationPath = [id];
    this._navigationManager.navigateToWithRelativeParent(navigationPath, this._route);
  }

  isSelected(id:string):boolean{
    if(this.selecteId === null || 
            id === null ||
            this.selecteId === undefined || 
            id === undefined
     ) {
       return false;}
    const isSelected: boolean = this.selecteId === id;
    return isSelected;
  }

  navigateOnSelectionById(id: string) {
    let navigationPath = [id];
    this._navigationManager.navigateToWithRelativeParent(navigationPath, this._route);
  }

  get products():Array<CartSummaryDetails>{
    return this._summary;
  }

  ngOnInit() {
    this._summary = this._cartManagementService.summary;
    this.totalPrice = this.getTotalPrice();
    this.totalAmount = this._summary.length;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  deleteButtonPressed(parameter:any){
    let details = <CartSummaryDetails> parameter;
    this._cartManagementService.removeProductFromCartBySummary(details);
  }

  refresh(parameter:any){
    let details = <CartSummaryDetails> parameter;
    this.isHidden = true;
  }

  private getTotalPrice():number{
    let total = 0;
    for (const details of this._summary) {
      total += details.price;
    }
    return total;
  }

}
