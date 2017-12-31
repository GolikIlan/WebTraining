import {Injectable, Inject} from '@angular/core';
import { LOCALIZATION } from './localizationinfra';


@Injectable()
export class LocalizationService {
    private _currentLang:string;

    constructor(@Inject(LOCALIZATION) private _translations: any) {
    }

    public get currentLang() {
        return this._currentLang;
    }

    public use(lang: string): void {
        // set current language
        this._currentLang = lang;
    }

    private translate(key: string): string {
        // private perform translation
        let translation = key;

        if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
            return this._translations[this.currentLang][key];
        }

        return translation;
    }

    public localize(key: string) {
        // call translation
        return this.translate(key); 
    }

}