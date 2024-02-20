import { Routes } from '@angular/router';

import { Pages } from 'src/app/shared/shared.enum';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../cms/cms-page/cms-page.component').then((m) => m.CMSPageComponent),
  },
  {
    path: Pages.Color,
    loadComponent: () => import('./color-doc/color.component').then((m) => m.ColorComponent),
  },
  {
    path: Pages.Icon,
    loadComponent: () => import('./icon-doc/icon-doc.component').then((m) => m.IconDocComponent),
  },
  {
    path: Pages.Layout,
    loadComponent: () => import('./layout-doc/layout-doc.component').then((m) => m.LayoutDocComponent),
  },
  {
    path: Pages.Shadow,
    loadComponent: () => import('./shadow-doc/shadow-doc.component').then((m) => m.ShadowDocComponent),
  },
  {
    path: Pages.Typography,
    loadComponent: () =>
      import('./typography-doc/typography-doc.component').then((m) => m.TypographyDocComponent),
  },
];
