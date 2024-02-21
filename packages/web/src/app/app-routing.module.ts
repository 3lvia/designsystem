import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { CMSPageComponent } from './doc-pages/cms/cms-page/cms-page.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './shared/error/error.component';
import { Pages } from './shared/shared.enum';

const routes: Routes = [
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
  { path: 'not-found', component: ErrorComponent },
  // From CMS
  {
    path: ':submenu',
    component: CMSPageComponent,
  },
  {
    path: ':submenu/:page',
    component: CMSPageComponent,
  },
  {
    path: 'preview/:entryId',
    component: CMSPageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 80],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
