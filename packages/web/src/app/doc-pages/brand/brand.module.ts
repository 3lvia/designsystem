import { NgModule } from '@angular/core';
import { ColorModule } from './color-doc/color.module';
import { IconDocModule } from './icon-doc/icon-doc.module';
import { LayoutDocModule } from './layout-doc/layout-doc.module';

@NgModule({
  imports: [ColorModule, IconDocModule, LayoutDocModule],
})
export class BrandModule {}
