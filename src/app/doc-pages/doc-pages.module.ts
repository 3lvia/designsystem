import { NgModule } from '@angular/core';
import { ButtonDocModule } from './button-doc/button-doc.module';
import { DividerDocModule } from './divider-doc/divider-doc.module';
import { ColorDocModule } from './color-doc/color-doc.module';

@NgModule({
  imports: [
    ButtonDocModule,
    DividerDocModule,
    ColorDocModule
  ],
})
export class DocPagesModule { }

