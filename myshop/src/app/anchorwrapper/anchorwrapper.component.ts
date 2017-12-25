import { Component, OnInit, ContentChildren, QueryList, AfterContentInit, AfterViewInit, ViewChild, ElementRef, ContentChild } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-anchorwrapper',
  templateUrl: './anchorwrapper.component.html',
  styleUrls: ['./anchorwrapper.component.css']
})
export class AnchorwrapperComponent implements OnInit,  AfterContentInit{
  private _anchore: HTMLAnchorElement;

  @ContentChild('contentAnchore') _projected:ElementRef;

  constructor() { }

  ngOnInit() {

  }
  
  ngAfterContentInit() {
    let a = this._projected;
    let url:string = a.nativeElement.href.toString();
    if(url.indexOf("mailto:") === 0) return;
    a.nativeElement.target = "_blank";
  }

}
