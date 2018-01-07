import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../products/product';
import { LineParameterInterface } from '../endoflinebutton/lineParameterInterface';
import { NavigationManagerService } from '../navigation-manager-service';
import { ActivatedRoute } from '@angular/router';

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
