import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeDocComponent } from './badge-doc.component';
import { ComponentContainerModule } from '../component-container/component-container.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentContainerModule
  ],
  declarations: [BadgeDocComponent]
})
export class BadgeDocModule { }
