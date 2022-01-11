import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/entities/client';
import { ClientService } from '../../../services/client.service';


@Component({
  selector: 'app-client-remove-dialog',
  templateUrl: './client-remove-dialog.component.html',
  styleUrls: ['./client-remove-dialog.component.scss']
})
export class ClientRemoveDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ClientRemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client, private _clientService:ClientService) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close();
  }

  removeClient(id:number){
    this._clientService.removeOb(id).subscribe( resp => (this.dialogRef.close(resp)));
  }

}