import { Routes } from '@angular/router';

import { Pages } from 'src/app/shared/shared.enum';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../cms/cms-page/cms-page.component').then((m) => m.CMSPageComponent),
  },
  {
    path: Pages.UtilityClasses,
    loadComponent: () =>
      import('./utilities-doc/utilities-doc.component').then((m) => m.UtilitiesDocComponent),
  },
  {
    path: Pages.TeamSymbol,
    loadComponent: () =>
      import('./team-symbol-doc/team-symbol-doc.component').then((m) => m.TeamSymbolDocComponent),
  },
];
