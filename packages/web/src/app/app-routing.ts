import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { Pages } from './shared/shared.enum';

export const routes: Routes = [
  {
    path: Pages.Index,
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: Pages.Home,
    redirectTo: Pages.Index,
  },
  // About section
  {
    path: 'about',
    loadChildren: () => import('./doc-pages/about/about-routing').then((m) => m.routes),
  },
  // Brand section
  {
    path: 'brand',
    loadChildren: () => import('./doc-pages/brand/brand-routing').then((m) => m.routes),
  },
  // Tools section
  {
    path: 'tools',
    loadChildren: () => import('./doc-pages/tools/tools-routing').then((m) => m.routes),
  },
  {
    path: 'patterns',
    loadChildren: () => import('./doc-pages/patterns/patterns-routing').then((m) => m.routes),
  },
  // Components section
  {
    path: 'components',
    loadChildren: () => import('./doc-pages/components/components-routing').then((m) => m.routes),
  },
  // Dev section
  {
    path: Pages.DevelopmentStart,
    loadChildren: () => import('./dev/dev-routing').then((m) => m.routes),
  },
  {
    path: 'not-found',
    loadComponent: () => import('./shared/error/error.component').then((m) => m.ErrorComponent),
  },
];
