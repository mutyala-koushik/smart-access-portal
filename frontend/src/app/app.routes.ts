import { Routes } from '@angular/router';

import { Login } from './pages/login/login';

import { Dashboard } from './pages/dashboard/dashboard';

import { Users } from './pages/users/users';

import { Reports } from './pages/reports/reports';

import { Settings } from './pages/settings/settings';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },

  {
    path:'login',
    component:Login
  },

  {
    path:'dashboard',
    component:Dashboard,
    canActivate:[authGuard]
  },

  {
    path:'users',
    component:Users,
    canActivate:[authGuard]
  },

  {
    path:'reports',
    component:Reports,
    canActivate:[authGuard]
  },

  {
    path:'settings',
    component:Settings,
    canActivate:[authGuard]
  },

  {
    path:'**',
    redirectTo:'login'
  }

];