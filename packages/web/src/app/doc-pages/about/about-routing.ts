import { Routes } from '@angular/router';

import { Pages } from 'src/app/shared/shared.enum';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../cms/cms-page/cms-page.component').then((m) => m.CMSPageComponent),
  },
  {
    path: Pages.TheDesignSystem,
    loadComponent: () =>
      import('./the-design-system-doc/the-design-system-doc.component').then(
        (m) => m.TheDesignSystemDocComponent,
      ),
  },
  {
    path: Pages.Contact,
    loadComponent: () => import('./contact/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: Pages.GetStarted,
    loadComponent: () =>
      import('./get-started-doc/get-started-doc.component').then((m) => m.GetStartedDocComponent),
  },
  {
    path: Pages.Tutorial,
    loadComponent: () => import('./tutorial/tutorial.component').then((m) => m.TutorialComponent),
  },
];
