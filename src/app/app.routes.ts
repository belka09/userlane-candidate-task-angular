import { Routes } from '@angular/router';
import { UsersTableComponent } from './shared/components/users-table/users-table.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: UsersTableComponent,
  },
];
