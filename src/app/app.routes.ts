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
      badgeAmount: 5,
    },
  },
  {
    path: 'forecast',
    loadComponent: () => import('./pages/forecast/forecast'),
    data: {
      icon: '@tui.trending-up-down',
      badgeAmount: 2,
    },
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings'),
    data: {
      icon: '@tui.settings',
    },
  },
  {
    path: '',
    redirectTo: '/today',
    pathMatch: 'full',
  },
];
