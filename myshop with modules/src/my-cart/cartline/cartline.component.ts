import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LineParameterInterface } from '../../core/interfaces/lineParameterInterface';
import { Product } from '../../core/product-model/product';


@Component({
  selector: 'app-cartline',
  templateUrl: './cartline.component.html',
  styleUrls: ['./cartline.component.css']
})
export class CartlineComponent implements LineParameterInterface {

  private _lineParameter:Product;

  @Output()
  lineSelected:EventEmitter<string> = new EventEmitter<string>();

  constructor() { 

  }

  selected(){
    this.lineSelected.emit(this.lineParameter.productId);
  }



  get lineParameter():Product{
    return this._lineParameter;
  }

  @Input()
  set lineParameter(value:Product){
    this._lineParameter = value;
  }
}
