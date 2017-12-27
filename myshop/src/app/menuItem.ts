import { Injectable, OnDestroy } from "@angular/core";
import { CartManagementService } from "./cartManagementService";
import { ISubscription } from "rxjs/Subscription";


@Injectable()
export class MenuItem {
    constructor(public title:string) {
    }
}

@Injectable()
export class MenuItemWithAmount extends MenuItem{
    constructor(title:string, public amount:number) {
        super(title);
    }
}

export class CartMenuItem extends MenuItemWithAmount{
    private _subscription: ISubscription;

    constructor(title:string, private _cartManagementService:CartManagementService) {
        super(title, _cartManagementService.productsAmount);
        this._subscription = this._cartManagementService.cartProductsAmountChanged.subscribe( amount => {
            this.whenAmountChanged(amount);
        });
    }

    private whenAmountChanged(amount: number){
        this.amount = amount;
    }

    destroy(){
        if(this._subscription === null) return;
        this._subscription.unsubscribe();
    }
}

