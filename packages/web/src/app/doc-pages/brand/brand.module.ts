import { NgModule } from '@angular/core';
import { ColorModule } from './color-doc/color.module';
import { IconDocModule } from './icon-doc/icon-doc.module';
import { LayoutDocModule } from './layout-doc/layout-doc.module';
import { ShadowDocModule } from './shadow-doc/shadow-doc.module';
import { TypographyDocModule } from './typography-doc/typography-doc.module';

@NgModule({
  imports: [ColorModule, IconDocModule, LayoutDocModule, ShadowDocModule, TypographyDocModule],
})
export class BrandModule {}
