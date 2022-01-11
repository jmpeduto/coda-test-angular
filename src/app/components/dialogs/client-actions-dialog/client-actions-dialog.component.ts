import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/entities/client';

@Component({
  selector: 'app-client-actions-dialog',
  templateUrl: './client-actions-dialog.component.html',
  styleUrls: ['./client-actions-dialog.component.scss']
})
export class ClientActionsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ClientActionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client) { }

  ngOnInit(): void {
  }

}
