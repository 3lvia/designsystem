import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeDocComponent } from './badge-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
  ],
  declarations: [BadgeDocComponent]
})
export class BadgeDocModule { }
