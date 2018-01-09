import { Directive, AfterViewChecked, AfterContentInit, Input, OnInit, ElementRef, Renderer, HostListener, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';


@Directive({ 
    selector: '[loadListener]' 
})
export class OnLoadListenerDirective implements OnInit, AfterViewInit{

    @Output()
   loadOccured:EventEmitter<boolean> = new EventEmitter<boolean>(); 
    constructor() {
    }


    private raiseLoadOccured() {
        this.loadOccured.emit(true);    }

    ngAfterViewInit(): void {
        setTimeout(_=> this.raiseLoadOccured(), 0);
    }


    ngOnInit(): void {
    }
}