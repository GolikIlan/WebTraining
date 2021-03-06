import { Router, ActivatedRoute } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class NavigationManagerService{

    constructor(private _router:Router) {
    }

    navigateTo(navigationPathParams:Array<string>):void
    {
        console.log();
        this._router.navigate(navigationPathParams);
    }

    navigateToWithRelativeParent(navigationPathParams:Array<string>, route:ActivatedRoute):void
    {
        console.log(navigationPathParams);
        this._router.navigate(navigationPathParams, {relativeTo: route});
    }

    

}