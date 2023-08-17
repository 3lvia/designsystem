import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandModule } from './brand.module';
import { CMSPageComponent } from '../cms/cms-page/cms-page.component';
import { ColorComponent } from './color-doc/color.component';
import { IconDocComponent } from './icon-doc/icon-doc.component';
import { LayoutDocComponent } from './layout-doc/layout-doc.component';
import { ShadowDocComponent } from './shadow-doc/shadow-doc.component';
import { TypographyDocComponent } from './typography-doc/typography-doc.component';
import { Pages } from 'src/app/shared/shared.enum';

const routes: Routes = [
  {
    path: '',
    component: CMSPageComponent,
  },
  {
    path: Pages.Color,
    component: ColorComponent,
  },
  {
    path: Pages.Icon,
    component: IconDocComponent,
  },
  {
    path: Pages.Layout,
    component: LayoutDocComponent,
  },
  {
    path: Pages.Shadow,
    component: ShadowDocComponent,
  },
  {
    path: Pages.Typography,
    component: TypographyDocComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), BrandModule],
  exports: [RouterModule],
})
export class BrandRoutingModule {}
