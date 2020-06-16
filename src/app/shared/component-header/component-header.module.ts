import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentHeaderComponent } from './component-header.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [ComponentHeaderComponent],
  declarations: [ComponentHeaderComponent]
})
export class ComponentHeaderModule { }
