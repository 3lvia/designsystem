import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDocComponent } from './card-doc.component';
import { ComponentExampleModule } from 'src/app/shared/component-example/component-example.module';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentExampleModule
  ],
  declarations: [CardDocComponent]
})
export class CardDocModule { }
