import { Injectable, OnDestroy } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";
import { CartManagementService } from "../cart-service/cartManagementService";
import { LoginSevice } from "../login-service/loginservice";
import { UserPermissionsStatusProvider } from "../permissions-service/user-permissions-status-provider";

@Injectable()
export class MenuItem {
    constructor(public title:string, public active:boolean, public path:string) {
    }

    onSelection(){
    }
}

@Injectable()
export class MenuItemWithAmount extends MenuItem{
    constructor(title:string, active:boolean, public amount:number, path:string) {
        super(title, active, path);
    }
}

@Injectable()
export class CartMenuItem extends MenuItemWithAmount{
    private _loginSubscription: ISubscription;
    //private _subscription: ISubscription;

    constructor(title:string, 
        private _cartManagementService:CartManagementService,
        private _loginService:LoginSevice, path:string) {
        super(title, _loginService.isLogedIn, 55555, path);

        this._loginSubscription = this._loginService.loginStatusChanged.subscribe((status) => {
            this.whenLoggedIn(status);
        });
    }

    whenLoggedIn(status: boolean): any {
        this.active = status
    }

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

    constructor(title:string,  private _loginService:LoginSevice, path:string) {
        super(title, _loginService.isLogedIn === false, path);

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

    constructor(title:string, private _loginService:LoginSevice, path:string) {
        super(title, _loginService.isLogedIn, path);

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
}

@Injectable()
export class AddProductMenuItem extends MenuItem{
    private _loginSubscription: ISubscription;

    constructor(title:string, private _loginService:LoginSevice, 
        private _userPermissionsStatusProvider:UserPermissionsStatusProvider, 
        path:string) {
        super(title, _userPermissionsStatusProvider.canCurrentUserAddNewProduct(), path);

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

