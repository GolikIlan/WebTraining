import { Pipe, PipeTransform } from '@angular/core';
import { LocalizationService } from './localizationservise';
import { TitleCasePipe } from '@angular/common';

@Pipe({
    name: 'localization',
    pure:false,
})

export class LocalizationPipe implements PipeTransform {

    constructor(private _translate: LocalizationService, private _titlecasePipe:TitleCasePipe) { }

    transform(value: string, args: any[]): any {
        if (!value) return;
        return this._titlecasePipe.transform(this._translate.localize(value));
    }
}