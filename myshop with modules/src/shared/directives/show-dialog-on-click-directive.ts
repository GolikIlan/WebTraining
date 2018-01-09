import { Directive, Output, Input, EventEmitter, HostListener } from "@angular/core";
import { MatDialog } from "@angular/material";
import { SaveDialogComponent } from "../save-dialog/save-dialog.component";

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
        this.show();
    }

    show() {
        let dialogRef = this.dialog.open(SaveDialogComponent, {
        data: {
            header: this.header,
            message: this.msg,
        }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.whenDialogClosed(result);
        });
    }

    private whenDialogClosed(result: boolean): any {
        this.sendResultIsReady.emit(result);
    }

}