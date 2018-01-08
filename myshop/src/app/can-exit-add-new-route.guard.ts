import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ShowOnClickDialogProviderDirective } from './save-directive';
import { ISubscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { IsDirtyIndicationProvider } from './is-dirty-indication-provider';

@Injectable()
export class CanExitNotSavedRouteGuard implements CanDeactivate<IsDirtyIndicationProvider> {
  private _deleteDialogSubscription: ISubscription;
  private _response:Subject<boolean>;
  

constructor(private _deleteDialogPresenter:ShowOnClickDialogProviderDirective) {
 this.initDeleteDialog();
 this._response = new Subject();
}

initDeleteDialog(): any {
  this._deleteDialogPresenter.header = "Exit";
  this._deleteDialogPresenter.msg = "Are you sure you want to exit form and discard your changes?";
  this._deleteDialogSubscription = this._deleteDialogPresenter.sendResultIsReady.subscribe((result) => {
    this.onDeleteConfirmationResult(result);
  })
}

private onDeleteConfirmationResult(args:boolean){
  setTimeout(() => {
    this._response.next(args);
  }, 10);
  return this._response;
}

canDeactivate(component: IsDirtyIndicationProvider, 
  currentRoute: ActivatedRouteSnapshot, 
  currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> {
    if(component.isDirty()){
      this._deleteDialogPresenter.onClick();
      return this._response;
    }
    setTimeout(() => {
      this._response.next(true);
    }, 10);
  return this._response;
}


  /*canDeactivate(component: AddNewProductComponent, 
    currentRoute: ActivatedRouteSnapshot, 
    currentState: RouterStateSnapshot, 
    nextState?: RouterStateSnapshot): boolean {
      if(component.isDirty() === false){
        return false;
      }
    return true;
  }*/
}
