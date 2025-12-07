import { Routes } from '@angular/router';
import { RegisterPage } from './auth/pages/register-page/register-page';
import { LoginPageComponent } from './auth/pages/login-page/login-page';
import { AuthLayout } from './auth/layout/auth-layout/auth-layout';
import { authGuard } from './auth/guards/auth.guard';
import { publicGuard } from './auth/guards/public.guard';
import { UsersLayout } from './users/layout/users-layout/users-layout';
import { UsersPage } from './users/pages/users-page/users-page'; // Import UsersPage
import { HomeUserPageComponent } from './users/pages/home-user-page.ts/home-user-page';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      { path: 'login', component: LoginPageComponent, canActivate: [publicGuard] },
      { path: 'register', component: RegisterPage, canActivate: [publicGuard] },
      { path: '', redirectTo: 'login', pathMatch: 'full' }, // default dentro de /auth
    ],
  },
  {
    path: 'home',
    component: UsersLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'profile',
        component: HomeUserPageComponent,
      },
      {
        path: 'users', // New route for UsersPage
        component: UsersPage,
      },
      {
        path: '**',
        redirectTo: 'profile',
      },
    ],
  },
  // Redirección raíz y fallback en una sola línea
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' },
];
