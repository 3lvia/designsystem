import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDocComponent } from './card-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
  ],
  declarations: [CardDocComponent]
})
export class CardDocModule { }
