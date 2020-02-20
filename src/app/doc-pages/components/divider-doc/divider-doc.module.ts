import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerDocComponent } from './divider-doc.component';
import { ComponentExampleModule } from 'src/app/shared/component-example/component-example.module';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentExampleModule
  ],
  declarations: [DividerDocComponent]
})
export class DividerDocModule { }
