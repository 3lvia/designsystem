import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridDocComponent } from './grid-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule
  ],
  declarations: [GridDocComponent]
})
export class GridDocModule { }
