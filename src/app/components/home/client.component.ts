import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MiaPagination, MiaQuery } from '@agencycoda/mia-core';

import { Client } from 'src/app/entities/client';
import { MiaTableComponent, MiaTableConfig } from 'agencycoda/mia-table/src/public-api';
import { ClientService } from '../../services/client.service';
import {
  MiaField,
  MiaFormConfig,
  MiaFormModalComponent,
  MiaFormModalConfig,
} from '@agencycoda/mia-form';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClientRemoveDialogComponent } from '../dialogs/client-remove-dialog/client-remove-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  mockData?: MiaPagination<any>;

  @ViewChild('tableComp') tableComp!: MiaTableComponent;

  //table configuration
  tableConfig: MiaTableConfig = new MiaTableConfig();
  queryScroll = new MiaQuery();

  constructor(
    private _clientService: ClientService,
    public dialog: MatDialog,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.loadConfig();
    this.setMockData();
    this.queryScroll.itemPerPage = 1;
    this.queryScroll;
  }

  setMockData() {
    this.mockData = {
      current_page: 1,
      first_page_url: '',
      from: '',
      last_page: 1,
      last_page_url: '',
      next_page_url: '',
      path: '',
      per_page: 10,
      prev_page_url: '',
      to: '',
      total: 1,
      data: [],
    };
  }

  loadConfig() {
    this.tableConfig.service = this._clientService;
    this.tableConfig.id = 'table-test-jpmeduto';
    this.tableConfig.query.itemPerPage = 5;
    this.tableConfig.columns = [
      {
        key: 'user',
        type: 'user',
        title: 'Name and lastname',
        extra: {
          field_firstname: 'firstname',
          field_lastname: 'lastname',
        },
      },
      {
        key: 'email',
        type: 'string',
        title: 'Email',
        field_key: 'email',
      },

      {
        key: 'more',
        type: 'more',
        title: 'Actions',
        extra: {
          actions: [
            { icon: 'create', title: 'Edit', key: 'edit' },
            { icon: 'delete', title: 'Delete', key: 'remove' },
          ],
        },
      },
    ];

    this.tableConfig.loadingColor = 'red';
    this.tableConfig.hasEmptyScreen = true;
    this.tableConfig.emptyScreenTitle =
      'No hay clientes almacenados en el sistema';

    this.tableConfig.onClick.subscribe((result) => {
      //ejecuta los eventos de click en los botones de contexto del item de la tabla
      switch (result.key) {
        case 'edit':
          this.clientEdit(result.item);
          break;
        case 'remove':
          this.clientRemove(result.item);
          break;
      }
    });
  }

  clientEdit(client: Client) {
    let data = new MiaFormModalConfig();
    data.service = this._clientService;
    data.titleNew = 'Create Client';
    data.titleEdit = 'Edit Client';
    let config = new MiaFormConfig();
    data.item = client;
    config.hasSubmit = false;
    config.fields = [
      { key: 'firstname', type: MiaField.TYPE_STRING, label: 'First name' },
      { key: 'lastname', type: MiaField.TYPE_STRING, label: 'Last name' },
      {
        key: 'email',
        type: MiaField.TYPE_STRING,
        label: 'Email',
        validators: [Validators.required],
      },
    ];
    config.errorMessages = [
      { key: 'required', message: 'The "%label%" is required.' },
    ];
    data.config = config;
    return this.dialog
      .open(MiaFormModalComponent, {
        width: '520px',
        panelClass: 'modal-full-width-mobile',
        data: data,
      })
      .afterClosed();
  }

  clientAdd() {
    let data = new MiaFormModalConfig();
    data.service = this._clientService;
    data.titleNew = 'Create Client';
    data.titleEdit = 'Edit Client';
    let config = new MiaFormConfig();
    data.item = new Client();
    config.hasSubmit = false;
    config.fields = [
      { key: 'firstname', type: MiaField.TYPE_STRING, label: 'First name' },
      { key: 'lastname', type: MiaField.TYPE_STRING, label: 'Last name' },
      {
        key: 'email',
        type: MiaField.TYPE_STRING,
        label: 'Email',
        validators: [Validators.required],
      },
    ];
    config.errorMessages = [
      { key: 'required', message: 'The "%label%" is required.' },
    ];
    data.config = config;
    return this.dialog
      .open(MiaFormModalComponent, {
        width: '520px',
        panelClass: 'modal-full-width-mobile',
        data: data,
      })
      .afterClosed()
      .subscribe((result) => {
        //TODO edit despues de afterClosed modifique dta sin refrescar la tabla
        //en caso de darse el alta correctamente resfresca la tabla
        if (result) {
          // console.log(result);
          this.tableComp.loadItems();
        }
      });
  }

  clientRemove(client: Client) {
    //TODO agregar que despues de eliminado un cliente vuelva a la pagina 1
    let data = new MiaFormModalConfig();
    data.item = client;
    return this.dialog
      .open(ClientRemoveDialogComponent, {
        width: '400px',
        panelClass: 'modal-full-width-mobile',
        data: data.item,
      })
      .afterClosed()
      .subscribe((result) => {
        //si ok al borrar 
        if(result){
          this.tableComp.loadItems();
        }
      });
  }
}
