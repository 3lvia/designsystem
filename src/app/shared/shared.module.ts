import { NgModule } from '@angular/core';
import { ComponentHeaderModule } from './component-header/component-header.module';
import { ComponentExampleModule } from './component-example/component-example.module';

@NgModule({
  imports: [
    ComponentHeaderModule,
    ComponentExampleModule,
  ],
})
export class DocPagesModule { }

