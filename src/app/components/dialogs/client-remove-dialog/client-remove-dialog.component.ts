import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/entities/client';


@Component({
  selector: 'app-client-remove-dialog',
  templateUrl: './client-remove-dialog.component.html',
  styleUrls: ['./client-remove-dialog.component.scss']
})
export class ClientRemoveDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ClientRemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client) { }

  ngOnInit(): void {
  }

  onNoClick(){}

}