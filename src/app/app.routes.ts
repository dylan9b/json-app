import { Routes } from '@angular/router';
import { RoutesConstants } from './shared/routes.constants';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/layout/layout').then((c) => c.Layout),
    children: [
      {
        path: RoutesConstants.HOME,
        loadComponent: () => import('./pages/home/home').then((c) => c.Home),
      },
      {
        path: RoutesConstants.FILES,
        loadComponent: () => import('./pages/files/files').then((c) => c.Files),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: RoutesConstants.HOME,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: RoutesConstants.HOME,
  },
];
