import { Injectable, OnDestroy } from "@angular/core";
import { CartManagementService } from "./cartManagementService";
import { ISubscription } from "rxjs/Subscription";
import { LoginSevice } from "./login/loginservice";
import { CartlineComponent } from "./cartline/cartline.component";
import { UserPermissionsStatusProvider } from "./login/user-permissions-status-provider";


@Injectable()
export class MenuItem {
    constructor(public title:string, public active:boolean) {
    }

    onSelection(){
    }
}



@Injectable()
export class MenuItemWithAmount extends MenuItem{
    constructor(title:string, active:boolean, public amount:number) {
        super(title, active);
    }
}

@Injectable()
export class CartMenuItem extends MenuItemWithAmount{
    private _loginSubscription: ISubscription;
    //private _subscription: ISubscription;

    constructor(title:string, 
        private _cartManagementService:CartManagementService,
        private _loginService:LoginSevice) {
        super(title, _loginService.isLogedIn, 55555);
        /*this._subscription = this._cartManagementService.cartProductsAmountChanged.subscribe( amount => {
            this.whenAmountChanged(amount);
        });*/

        this._loginSubscription = this._loginService.loginStatusChanged.subscribe((status) => {
            this.whenLoggedIn(status);
        });
    }

    whenLoggedIn(status: boolean): any {
        this.active = status
    }

    /*private whenAmountChanged(amount: number){
        this.amount = amount;
    }*/

    get amount():number{
        return this._cartManagementService.productsAmount;
    }

    set amount(value:number){
    }

    destroy(){
        //this._subscription.unsubscribe();
        this._loginSubscription.unsubscribe();
    }
}

@Injectable()
export class  LoginMenuItem extends MenuItem{
    private _loginSubscription: ISubscription;

    constructor(title:string,  private _loginService:LoginSevice) {
        super(title, _loginService.isLogedIn === false);

        this._loginSubscription = this._loginService.loginStatusChanged.subscribe((status) => {
            this.whenLoggedIn(status);
        });
    }

    whenLoggedIn(status: boolean): any {
        this.active = status === false;
    }

    destroy(){
        if(this._loginSubscription === null) return;
        this._loginSubscription.unsubscribe();
    }
}

@Injectable()
export class  LogoutMenuItem extends MenuItem{
    private _loginSubscription: ISubscription;

    constructor(title:string, private _loginService:LoginSevice) {
        super(title, _loginService.isLogedIn);

        this._loginSubscription = this._loginService.loginStatusChanged.subscribe((status) => {
            this.whenLoggedIn(status);
        });
    }

    whenLoggedIn(status: boolean): any {
        this.active = status;
    }

    destroy(){
        if(this._loginSubscription === null) return;
        this._loginSubscription.unsubscribe();
    }

    onSelection(){
        this._loginService.logOut();
    }
}

@Injectable()
export class AddProductMenuItem extends MenuItem{
    private _loginSubscription: ISubscription;

    constructor(title:string, private _loginService:LoginSevice, private _userPermissionsStatusProvider:UserPermissionsStatusProvider) {
        super(title, _userPermissionsStatusProvider.canCurrentUserAddNewProduct());

        this._loginSubscription = this._loginService.loginStatusChanged.subscribe((status) => {
            this.whenLoggedIn(status);
        });
    }

    whenLoggedIn(status: boolean): any {
        this.active = this._userPermissionsStatusProvider.canCurrentUserAddNewProduct();
    }

    destroy(){
        if(this._loginSubscription === null) return;
        this._loginSubscription.unsubscribe();
    }
}

