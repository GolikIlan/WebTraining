import { Directive, Output, EventEmitter, OnInit, HostListener } from "@angular/core";
import { MatDialog } from "@angular/material";
import { SaveDialogComponent } from "../save-dialog/save-dialog.component";

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