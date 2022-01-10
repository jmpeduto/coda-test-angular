import { Component, OnInit } from '@angular/core';
import { MiaPagination, MiaQuery } from '@agencycoda/mia-core';

import { Client } from 'src/app/entities/client';
import { MiaColumn, MiaTableConfig } from 'agencycoda/mia-table/src/public-api';
import { ClientService } from '../../services/client.service';
import { MiaField, MiaFormConfig, MiaFormModalComponent, MiaFormModalConfig } from '@agencycoda/mia-form';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //client list
  mockData?: MiaPagination<any>;
  clientList: any[] = [];

  //table configuration
  tableConfig: MiaTableConfig = new MiaTableConfig();
  queryScroll = new MiaQuery();

  constructor(private _clientService: ClientService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadConfig();
    // this._clientService.getClients().subscribe((resp: any) => {
    //   this.clientList = resp.response.data;
    //   console.log(this.clientList);
    // });
    this.setMockData();
    this.queryScroll.itemPerPage = 1;
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
      // { key: 'selection', type: 'selection', title: '' },
      //{ key: 'id', type: 'string', title: 'ID', field_key: 'id' },
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
      console.log('--ACTION--');
      console.log(result);
      this.clientEdit(result.item);
    });
  }

  clientEdit(client:Client) {
    let data = new MiaFormModalConfig();
    data.service = this._clientService;
    data.titleNew = 'Create Client';
    data.titleEdit = 'Edit Client';
    let config = new MiaFormConfig();
    // config.fields = [{ key: 'email', type: 'email'}];
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

  clientRemove() {}
}
