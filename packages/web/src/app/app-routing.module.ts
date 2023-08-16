import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Pages } from './shared/shared.enum';

import { CMSPageComponent } from './doc-pages/cms/cms-page/cms-page.component';
import { ErrorComponent } from './shared/error/error.component';
import { HomeComponent } from './home/home.component';

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
    loadChildren: () => import('./doc-pages/about/about-routing.module').then((m) => m.BrandRoutingModule),
  },
  // Brand section
  {
    path: 'brand',
    loadChildren: () => import('./doc-pages/brand/brand-routing.module').then((m) => m.BrandRoutingModule),
  },
  // Tools section
  {
    path: 'tools',
    loadChildren: () => import('./doc-pages/tools/tools-routing.module').then((m) => m.ToolsRoutingModule),
  },
  // Components section
  {
    path: 'components',
    loadChildren: () =>
      import('./doc-pages/components/components-routing.module').then((m) => m.ComponentsRoutingModule),
  },
  // Dev section
  {
    path: Pages.DevelopmentStart,
    loadChildren: () => import('./dev/dev-routing.module').then((m) => m.DevRoutingModule),
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
      scrollOffset: [0, 128],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
