import { Route, Routes } from '@angular/router';

export interface RoutesWithIconAndBadge extends Route {
  data: {
    icon: string;
    badgeAmount?: number | null;
  };
}

export const routes: Routes = [
  {
    path: 'today',
    loadComponent: () => import('./pages/today/today'),
    data: {
      icon: '@tui.tent-tree',
    },
  },
  {
    path: 'forecast',
    loadComponent: () => import('./pages/forecast/forecast'),
    data: {
      icon: '@tui.trending-up-down',
      badgeAmount: 3,
    },
  },
  {
    path: '',
    redirectTo: '/today',
    pathMatch: 'full',
  },
];
