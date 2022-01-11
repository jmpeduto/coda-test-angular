import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MiaAuthInterceptor, MiaAuthModule, MIA_AUTH_PROVIDER } from '@agencycoda/mia-auth';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MiaCoreModule, MIA_GOOGLE_STORAGE_PROVIDER } from '@agencycoda/mia-core';
import { MiaTableModule } from '@agencycoda/mia-table';
import { MiaFormModule } from '@agencycoda/mia-form';
import { MiaLoadingModule } from '@agencycoda/mia-loading';
import { ClientComponent } from './components/home/client.component';
import { ClientActionsDialogComponent } from './components/dialogs/client-actions-dialog/client-actions-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { ClientRemoveDialogComponent } from './components/dialogs/client-remove-dialog/client-remove-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    ClientActionsDialogComponent,
    ClientRemoveDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,

    // Agency Coda Modules
    MiaCoreModule,
    MiaAuthModule,
    MiaTableModule,
    MiaLoadingModule,
    MiaFormModule,
  ],
  providers: [
    { 
      provide: MIA_AUTH_PROVIDER, 
      useValue: {
        baseUrl: environment.baseUrl
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MiaAuthInterceptor,
      multi: true
    },
    {
      provide: MIA_GOOGLE_STORAGE_PROVIDER,
      useValue: {
        bucket: environment.cloudStorageBucket
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
