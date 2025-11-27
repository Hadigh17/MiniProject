import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { HomeComponent } from './pages/home/home';
import { CustomersListComponent } from './pages/customers-list/customers-list';
import { ManageCustomersComponent } from './pages/manage-customers/manage-customers';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'customers', component: CustomersListComponent, canActivate: [authGuard] },
  { path: 'customers/manage', component: ManageCustomersComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: 'home' }
];
