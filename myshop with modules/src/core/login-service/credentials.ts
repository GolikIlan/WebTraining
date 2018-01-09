import { InjectionToken } from "@angular/core";


const dictionary = {
    "admin":"admin",
    "user":"user",
};

export const CREDENTIALS = new InjectionToken('credentials');

export const CREDENTIALS_PROVIDERS = [
    { provide: CREDENTIALS, useValue: dictionary },
];