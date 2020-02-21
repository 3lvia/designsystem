import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerDocComponent } from './divider-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
  ],
  declarations: [DividerDocComponent]
})
export class DividerDocModule { }
