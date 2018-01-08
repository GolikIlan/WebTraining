import { Directive, AfterViewChecked, AfterContentInit, Input, OnInit, ElementRef, Renderer, HostListener, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SaveDialogComponent } from './save-dialog/save-dialog.component';

@Directive({ 
    selector: '[clickListener]' 
})
export class SaveOnClickDialogProviderDirective implements OnInit{

    @Output()
    saveResultIsReady:EventEmitter<boolean> = new EventEmitter<boolean>(); 

    constructor(private dialog:MatDialog) {
        
    }

    @HostListener('click', ['$event']) 
    onClick(event){
        let dialogRef = this.dialog.open(SaveDialogComponent, {data: {
            header: 'Save'  ,
            message: 'To save data?',
          }});
      
          dialogRef.afterClosed().subscribe(result => {
            this.whenDialogClosed(result);
          });
    }

    whenDialogClosed(result: boolean): any {
        this.saveResultIsReady.emit(result);
    }


    ngOnInit(): void {
    }
}

@Directive({ 
    selector: '[sendClickListener]' 
})
export class SendOnClickDialogProviderDirective implements OnInit{

    @Output()
    sendResultIsReady:EventEmitter<boolean> = new EventEmitter<boolean>(); 

    constructor(private dialog:MatDialog) {
        
    }

    @HostListener('click', ['$event']) 
    onClick(event){
        let dialogRef = this.dialog.open(SaveDialogComponent, {data: {
            header: 'Send Email'  ,
            message: 'Are you sure you want to send the message?',
          }});
      
          dialogRef.afterClosed().subscribe(result => {
            this.whenDialogClosed(result);
          });
    }

    whenDialogClosed(result: boolean): any {
        this.sendResultIsReady.emit(result);
    }


    ngOnInit(): void {
    }
}

@Directive({ 
    selector: '[showClickListener]' 
})
export class ShowOnClickDialogProviderDirective {

    @Output()
    sendResultIsReady:EventEmitter<boolean> = new EventEmitter<boolean>(); 

    @Input()header:string;
    @Input()msg:string;

    constructor(private dialog:MatDialog) {
        
    }

    @HostListener('click') 
    onClick(){
        let dialogRef = this.dialog.open(SaveDialogComponent, {data: {
            header: this.header,
            message: this.msg,
          }});
      
          dialogRef.afterClosed().subscribe(result => {
            this.whenDialogClosed(result);
          });
    }

    private whenDialogClosed(result: boolean): any {
        this.sendResultIsReady.emit(result);
    }

}

@Directive({ 
    selector: '[loadListener]' 
})
export class OnLoadListenerDirective implements OnInit, AfterViewInit{

    @Output()
   loadOccured:EventEmitter<boolean> = new EventEmitter<boolean>(); 
    constructor() {
    }


    private raiseLoadOccured() {
        this.loadOccured.emit(true);
    }

    ngAfterViewInit(): void {
        setTimeout(_=> this.raiseLoadOccured(), 0);
    }


    ngOnInit(): void {
    }
}