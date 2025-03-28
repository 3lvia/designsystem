import { Routes } from '@angular/router';

import { Pages } from 'src/app/shared/shared.enum';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./about-doc.component').then((m) => m.AboutDocComponent),
    title: 'About',
  },
  {
    path: Pages.TheDesignSystem,
    loadComponent: () =>
      import('./the-design-system-doc/the-design-system-doc.component').then(
        (m) => m.TheDesignSystemDocComponent,
      ),
    title: 'The design system',
  },
  {
    path: Pages.Contact,
    loadComponent: () => import('./contact/contact.component').then((m) => m.ContactComponent),
    title: 'Contact',
  },
  {
    path: Pages.GetStarted,
    loadComponent: () =>
      import('./get-started-doc/get-started-doc.component').then((m) => m.GetStartedDocComponent),
    title: 'Get started',
  },
  {
    path: Pages.Tutorial,
    loadComponent: () => import('./tutorial/tutorial.component').then((m) => m.TutorialComponent),
    title: 'Tutorial',
  },
  {
    path: Pages.Faq,
    loadComponent: () => import('./faq/faq.component').then((m) => m.FaqComponent),
    title: 'FAQ',
  },
];
