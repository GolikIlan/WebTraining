import { Component, OnInit, ContentChild, AfterContentInit, Output, EventEmitter, Input } from '@angular/core';
import { LineParameterInterface } from './lineParameterInterface';
import { TargetDirective } from '../cartaddingwrapper/target-id-directive';

@Component({
  selector: 'app-endoflinebutton',
  templateUrl: './endoflinebutton.component.html',
  styleUrls: ['./endoflinebutton.component.css']
})
export class EndoflinebuttonComponent implements OnInit, AfterContentInit {
  private _classes: any;
  private _parameter: any;

  @Output()
  buttonPressed:EventEmitter<any> = new EventEmitter<any>();
  @ContentChild(TargetDirective) _projectedProductComponent:TargetDirective;

  constructor() { 

  }

  ngAfterContentInit() {
    this._parameter = this._projectedProductComponent.target;
  }

  ngOnInit() {
  }

  onclick(){
    this.buttonPressed.emit(this._parameter);
  }

  @Input()
  get classes():any{
    return this._classes;
  }

  set classes(value:any){
    this._classes = value;
  }

}
