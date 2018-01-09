import { Directive, OnInit, Output, EventEmitter, HostListener } from "@angular/core";
import { SaveDialogComponent } from "../save-dialog/save-dialog.component";
import { MatDialog } from "@angular/material";

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