import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-closebutton',
  templateUrl: './closebutton.component.html',
  styleUrls: ['./closebutton.component.css']
})
export class ClosebuttonComponent implements OnInit {
  private _currentClass: any;

  constructor() {}

  @Input()
  set currentClass(value:any){
    this._currentClass = value;
  }


  get currentClass():any{
    return this._currentClass;
  }

  ngOnInit() {
  }

}
