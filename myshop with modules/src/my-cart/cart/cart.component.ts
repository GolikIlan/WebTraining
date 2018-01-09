import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { CartSummaryDetails, CartManagementService } from '../../core/cart-service/cartManagementService';
import { ShowOnClickDialogProviderDirective } from '../../shared/directives/show-dialog-on-click-directive';
import { NavigationManagerService } from '../../core/navigation_service/navigation-manager-service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  private _deleteDialogSubscription: ISubscription;

  private _detailsToDelete: any;
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

  constructor(private _cartManagementService:CartManagementService, 
    private _navigationManager:NavigationManagerService,
    private _route:ActivatedRoute, 
    private _deleteDialogPresenter:ShowOnClickDialogProviderDirective) { 
      this._isRedyForRouting = false;
      this.isHidden = true;
      this.initDeleteDialog();
      this._subscription = this._cartManagementService.cartProductsAmountChanged.subscribe( amount => {
      this._summary = this._cartManagementService.summary;
      this.totalPrice = this.getTotalPrice();
      this.totalAmount = this._summary.length;
  });
  }

  initDeleteDialog(): any {
    this._deleteDialogPresenter.header = "Delete";
    this._deleteDialogPresenter.msg = "Are you sure?";
    this._deleteDialogSubscription = this._deleteDialogPresenter.sendResultIsReady.subscribe((result) => {
      this.onDeleteConfirmationResult(result);
    })
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
    this._deleteDialogSubscription.unsubscribe();
  }

  deleteButtonPressed(parameter:any){
    this._detailsToDelete = <CartSummaryDetails> parameter;
    this._deleteDialogPresenter.onClick();
  }

  private onDeleteConfirmationResult(args:boolean){
    if(args === false){
      this._detailsToDelete = undefined;
    }
    else{
      this._cartManagementService.removeProductFromCartBySummary(this._detailsToDelete);
    }
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
