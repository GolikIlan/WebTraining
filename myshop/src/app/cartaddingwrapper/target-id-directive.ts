
import { Directive, Input, OnInit, ElementRef, Renderer } from '@angular/core';
import { Product } from '../products/product';

@Directive({ 
    selector: '[target]' 
})
export class TargetDirective implements OnInit{

   private  _target: Product;
    
    get target():Product{
        return this._target;
    }

    @Input()
    set target(value:Product){
        this._target = value;
    }

    ngOnInit(): void {
    }
}