import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandModule } from './brand.module';
import { CMSPageComponent } from '../cms/cms-page/cms-page.component';
import { ColorComponent } from '../other-pages/color/color.component';
import { ColorDocComponent } from './color-doc/color-doc.component';
import { IconDocComponent } from './icon-doc/icon-doc.component';
import { LayoutDocComponent } from './layout-doc/layout-doc.component';
import { ShadowDocComponent } from './shadow-doc/shadow-doc.component';
import { TypographyDocComponent } from './typography-doc/typography-doc.component';

const routes: Routes = [
  {
    path: '',
    component: CMSPageComponent,
  },
  {
    path: 'color',
    component: ColorDocComponent,
  },
  {
    path: 'color2',
    component: ColorComponent,
  },
  {
    path: 'icon',
    component: IconDocComponent,
  },
  {
    path: 'layout',
    component: LayoutDocComponent,
  },
  {
    path: 'shadow',
    component: ShadowDocComponent,
  },
  {
    path: 'typography',
    component: TypographyDocComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), BrandModule],
  exports: [RouterModule],
})
export class BrandRoutingModule {}
