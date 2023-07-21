import { NgModule } from '@angular/core';
import { ColorDocModule } from './color-doc/color-doc.module';
import { IconDocModule } from './icon-doc/icon-doc.module';
import { LayoutDocModule } from './layout-doc/layout-doc.module';
import { ShadowDocModule } from './shadow-doc/shadow-doc.module';
import { TypographyDocModule } from './typography-doc/typography-doc.module';
import { ColorModule } from '../other-pages/color/color.module';

@NgModule({
  imports: [
    ColorModule,
    ColorDocModule,
    IconDocModule,
    LayoutDocModule,
    ShadowDocModule,
    TypographyDocModule,
  ],
})
export class BrandModule {}
