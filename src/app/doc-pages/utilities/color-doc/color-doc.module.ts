import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorDocComponent } from './color-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';
import { DoDontModule } from 'src/app/shared/do-dont/do-dont.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    DoDontModule
  ],
  declarations: [ColorDocComponent]
})
export class ColorDocModule { }
