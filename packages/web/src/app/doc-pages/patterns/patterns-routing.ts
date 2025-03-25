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
    path: Pages.Cookies,
    loadComponent: () => import('./cookies-doc/cookies-doc.component').then((m) => m.CookiesDocComponent),
  },
  {
    path: Pages.EmptyStates,
    loadComponent: () =>
      import('./empty-states-doc/empty-states-doc.component').then((m) => m.EmptyStatesDocComponent),
  },
  {
    path: Pages.Filters,
    loadComponent: () => import('./filters-doc/filters-doc.component').then((m) => m.FiltersDocComponent),
  },
  {
    path: Pages.Forms,
    loadComponent: () => import('./forms-doc/forms-doc.component').then((m) => m.FormsDocComponent),
  },
  {
    path: Pages.Graph,
    loadComponent: () => import('./graph-doc/graph-doc.component').then((m) => m.GraphDocComponent),
  },
  {
    path: Pages.Groups,
    loadComponent: () => import('./groups-doc/groups-doc.component').then((m) => m.GroupsDocComponent),
  },
  {
    path: Pages.Onboarding,
    loadComponent: () =>
      import('./onboarding-doc/onboarding-doc.component').then((m) => m.OnboardingDocComponent),
  },
  {
    path: Pages.Validations,
    loadComponent: () =>
      import('./validations-doc/validations-doc.component').then((m) => m.ValidationsDocComponent),
  },
];
