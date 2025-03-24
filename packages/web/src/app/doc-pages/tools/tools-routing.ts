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
    path: Pages.DesignProcess,
    loadComponent: () =>
      import('./design-process-doc/design-process-doc.component').then((m) => m.DesignProcessDocComponent),
  },
  {
    path: Pages.Evaluation,
    loadComponent: () =>
      import('./evaluation-doc/evaluation-doc.component').then((m) => m.EvaluationDocComponent),
  },
  {
    path: Pages.Icebreakers,
    loadComponent: () =>
      import('./icebreaker-doc/icebreaker-doc.component').then((m) => m.IcebreakerDocComponent),
  },
  {
    path: Pages.Ideation,
    loadComponent: () => import('./ideation-doc/ideation-doc.component').then((m) => m.IdeationDocComponent),
  },
  {
    path: Pages.Personas,
    loadComponent: () => import('./personas-doc/personas-doc.component').then((m) => m.PersonasDocComponent),
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
  {
    path: Pages.Templates,
    loadComponent: () =>
      import('./templates-doc/templates-doc.component').then((m) => m.TemplatesDocComponent),
  },
  {
    path: Pages.UserFeedback,
    loadComponent: () =>
      import('./user-feedback-doc/user-feedback-doc.component').then((m) => m.UserFeedbackDocComponent),
  },
];
