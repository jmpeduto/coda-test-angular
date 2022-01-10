import { Routes } from '@angular/router';
import { ClientComponent } from './components/home/client.component';

export const ROUTES: Routes = [
    {path: 'client-list', component: ClientComponent},
    {path: '', pathMatch: 'full', redirectTo: 'client-list'},
    {path: '**', pathMatch: 'full', redirectTo: 'client-list'}
]