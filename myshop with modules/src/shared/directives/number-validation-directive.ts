import { Directive, Input, OnInit, ElementRef, Renderer, SimpleChanges, OnChanges } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator } from '@angular/forms';


@Directive({ 
    selector: '[forbiddenMinimum]',
    providers: [{provide: NG_VALIDATORS, useExisting: NumberValidationDirective, multi: true}] 
})
export class NumberValidationDirective implements Validator{

    private  _forbiddenMinnimum: number;
    
    get forbiddenMinimum():any{
        return this._forbiddenMinnimum;
    }

    @Input()
    set forbiddenMinimum(value:any){
        this._forbiddenMinnimum = value;
    }

    validate(c: AbstractControl): { [key: string]: any; } {

        let value = c.value;
        if(value < 0 || value === 0)
        {
            return {
                validateLarger: {valid:false}
            }
        }

        return null;
    }
    registerOnValidatorChange?(fn: () => void): void {
        
    }

}