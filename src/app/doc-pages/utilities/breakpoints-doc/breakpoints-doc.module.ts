import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointsDocComponent } from './breakpoints-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule
  ],
  declarations: [BreakpointsDocComponent]
})
export class BreakpointsDocModule { }
