import { Routes } from '@angular/router';

import { Pages } from '../shared/shared.enum';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./v2-playground/v2-playground.component').then((m) => m.v2PlaygroundComponent),
    title: 'DEV',
  },
  {
    path: Pages.DevelopmentPlayground,
    loadComponent: () =>
      import('./v2-playground/v2-playground.component').then((m) => m.v2PlaygroundComponent),
    title: 'DEV',
  },
];
