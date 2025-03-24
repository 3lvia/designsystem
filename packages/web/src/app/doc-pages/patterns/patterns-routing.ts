import { Routes } from '@angular/router';

import { Pages } from 'src/app/shared/shared.enum';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./patterns-doc.component').then((m) => m.PatternsDocComponent),
  },
  {
    path: Pages.Comments,
    loadComponent: () => import('./comments-doc/comments-doc.component').then((m) => m.CommentsDocComponent),
  },
  {
    path: Pages.EmptyStates,
    loadComponent: () =>
      import('./empty-states-doc/empty-states-doc.component').then((m) => m.EmptyStatesDocComponent),
  },
];
