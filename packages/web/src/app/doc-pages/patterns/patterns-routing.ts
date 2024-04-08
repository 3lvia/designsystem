import { Routes } from '@angular/router';

import { Pages } from 'src/app/shared/shared.enum';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../cms/cms-page/cms-page.component').then((m) => m.CMSPageComponent),
  },
  {
    path: Pages.EmptyStates,
    loadComponent: () =>
      import('./empty-states-doc/empty-states-doc.component').then((m) => m.EmptyStatesDocComponent),
  },
];
