import {Component, Inject} from '@angular/core';
import * as MatDialog from '@angular/material/dialog';

@Component({
  selector: 'error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})

export class ErrorDialogComponent {
  constructor(
    @Inject(MatDialog.MAT_DIALOG_DATA)
    public data: { message: string; status?: number },
    public dialogRef: MatDialog.MatDialogRef<ErrorDialogComponent>
  ) {}

  Close(){
    this.dialogRef.close();
  }
}