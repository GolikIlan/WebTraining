import { Component, OnInit, ContentChild, AfterContentInit, Output, EventEmitter, Input } from '@angular/core';
import { LineParameterInterface } from './lineParameterInterface';

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
  @ContentChild('parameterProvider') _projectedContent:LineParameterInterface;

  constructor() { 

  }

  ngAfterContentInit() {
    this._parameter = this._projectedContent.lineParameter;
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
