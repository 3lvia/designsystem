import { Routes } from '@angular/router';

import { Pages } from 'src/app/shared/shared.enum';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./brand-doc.component').then((m) => m.BrandDocComponent),
  },
  {
    path: Pages.TheConcept,
    loadComponent: () => import('./concept-doc/concept-doc.component').then((m) => m.ConceptDocComponent),
  },
  {
    path: Pages.Examples,
    loadComponent: () => import('./examples-doc/examples-doc.component').then((m) => m.ExamplesDocComponent),
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
    path: Pages.Illustration,
    loadComponent: () =>
      import('./illustrations-doc/illustrations-doc.component').then((m) => m.IllustrationsDocComponent),
  },
  {
    path: Pages.Images,
    loadComponent: () => import('./image-doc/image-doc.component').then((m) => m.ImageDocComponent),
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
