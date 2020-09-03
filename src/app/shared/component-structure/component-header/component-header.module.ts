import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentHeaderComponent } from './component-header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [ComponentHeaderComponent],
  declarations: [ComponentHeaderComponent],
})
export class ComponentHeaderModule { }
