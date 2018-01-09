import { InjectionToken } from "@angular/core";


const dictionary = {
    "admin^admin":{"products":{add:true, edit:true}},
    "user^user":{"products":{add:false, edit:false}},
};

export const PERMISSIONS = new InjectionToken('permissions');

export const PERMISSIONS_PROVIDERS = [
    { provide: PERMISSIONS, useValue: dictionary },
];