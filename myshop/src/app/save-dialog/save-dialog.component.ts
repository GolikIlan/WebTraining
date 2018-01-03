import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR} from '@angular/material';

@Component({
  selector: 'app-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.css']
})
export class SaveDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SaveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log();
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  okClick(){
    this.dialogRef.close(true);
  }

}
