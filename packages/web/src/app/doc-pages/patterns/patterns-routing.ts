import { Routes } from '@angular/router';

import { Pages } from 'src/app/shared/shared.enum';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./patterns-doc.component').then((m) => m.PatternsDocComponent),
    title: 'Patterns',
  },
  {
    path: Pages.Comments,
    loadComponent: () => import('./comments-doc/comments-doc.component').then((m) => m.CommentsDocComponent),
    title: 'Comments',
  },
  {
    path: Pages.Cookies,
    loadComponent: () => import('./cookies-doc/cookies-doc.component').then((m) => m.CookiesDocComponent),
    title: 'Cookies',
  },
  {
    path: Pages.DataFormats,
    loadComponent: () =>
      import('./data-formats-doc/data-formats-doc.component').then((m) => m.DataFormatsDocComponent),
    title: 'Data Formats',
  },
  {
    path: Pages.EmptyStates,
    loadComponent: () =>
      import('./empty-states-doc/empty-states-doc.component').then((m) => m.EmptyStatesDocComponent),
    title: 'Empty States',
  },
  {
    path: Pages.Filters,
    loadComponent: () => import('./filters-doc/filters-doc.component').then((m) => m.FiltersDocComponent),
    title: 'Filters',
  },
  {
    path: Pages.Forms,
    loadComponent: () => import('./forms-doc/forms-doc.component').then((m) => m.FormsDocComponent),
    title: 'Forms',
  },
  {
    path: Pages.Graph,
    loadComponent: () => import('./graph-doc/graph-doc.component').then((m) => m.GraphDocComponent),
    title: 'Graph',
  },
  {
    path: Pages.Groups,
    loadComponent: () => import('./groups-doc/groups-doc.component').then((m) => m.GroupsDocComponent),
    title: 'Groups',
  },
  {
    path: Pages.Onboarding,
    loadComponent: () =>
      import('./onboarding-doc/onboarding-doc.component').then((m) => m.OnboardingDocComponent),
    title: 'Onboarding',
  },
  {
    path: Pages.Validations,
    loadComponent: () =>
      import('./validations-doc/validations-doc.component').then((m) => m.ValidationsDocComponent),
    title: 'Validations',
  },
];
