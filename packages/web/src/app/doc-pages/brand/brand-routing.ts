import { Routes } from '@angular/router';

import { Pages } from 'src/app/shared/shared.enum';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./brand-doc.component').then((m) => m.BrandDocComponent),
    title: 'Brand',
  },
  {
    path: Pages.TheConcept,
    loadComponent: () => import('./concept-doc/concept-doc.component').then((m) => m.ConceptDocComponent),
    title: 'The Concept',
  },
  {
    path: Pages.Examples,
    loadComponent: () => import('./examples-doc/examples-doc.component').then((m) => m.ExamplesDocComponent),
    title: 'Examples',
  },
  {
    path: Pages.Color,
    loadComponent: () => import('./color-doc/color.component').then((m) => m.ColorComponent),
    title: 'Color',
  },
  {
    path: Pages.Icon,
    loadComponent: () => import('./icon-doc/icon-doc.component').then((m) => m.IconDocComponent),
    title: 'Icon',
  },
  {
    path: Pages.Illustration,
    loadComponent: () =>
      import('./illustrations-doc/illustrations-doc.component').then((m) => m.IllustrationsDocComponent),
    title: 'Illustration',
  },
  {
    path: Pages.Images,
    loadComponent: () => import('./image-doc/image-doc.component').then((m) => m.ImageDocComponent),
    title: 'Images',
  },
  {
    path: Pages.Layout,
    loadComponent: () => import('./layout-doc/layout-doc.component').then((m) => m.LayoutDocComponent),
    title: 'Layout',
  },
  {
    path: Pages.Logo,
    loadComponent: () => import('./logo-doc/logo-doc.component').then((m) => m.LogoDocComponent),
    title: 'Logo',
  },
  {
    path: Pages.Shadow,
    loadComponent: () => import('./shadow-doc/shadow-doc.component').then((m) => m.ShadowDocComponent),
    title: 'Shadow',
  },
  {
    path: Pages.Theme,
    loadComponent: () => import('./theme-doc/theme-doc.component').then((m) => m.ThemeDocComponent),
    title: 'Theme',
  },
  {
    path: Pages.ToneOfVoice,
    loadComponent: () =>
      import('./tone-of-voice-doc/tone-of-voice-doc.component').then((m) => m.ToneOfVoiceDocComponent),
    title: 'Tone of Voice',
  },
  {
    path: Pages.Typography,
    loadComponent: () =>
      import('./typography-doc/typography-doc.component').then((m) => m.TypographyDocComponent),
    title: 'Typography',
  },
];
