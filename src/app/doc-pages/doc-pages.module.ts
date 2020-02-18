import { NgModule } from '@angular/core';
import { ButtonDocModule } from './button-doc/button-doc.module';
import { DividerDocModule } from './divider-doc/divider-doc.module';

@NgModule({
  imports: [
    ButtonDocModule,
    DividerDocModule
  ],
})
export class DocPagesModule { }

