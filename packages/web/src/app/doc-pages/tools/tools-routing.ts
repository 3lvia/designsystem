import { Routes } from '@angular/router';

import { Pages } from 'src/app/shared/shared.enum';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tools-doc.component').then((m) => m.ToolsDocComponent),
  },
  {
    path: Pages.Accessibility,
    loadComponent: () =>
      import('./accessibility-doc/accessibility-doc.component').then((m) => m.AccessibilityDocComponent),
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
