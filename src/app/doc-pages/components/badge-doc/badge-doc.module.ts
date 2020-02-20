import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeDocComponent } from './badge-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';
import { ComponentExampleModule } from 'src/app/shared/component-example/component-example.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentExampleModule
  ],
  declarations: [BadgeDocComponent]
})
export class BadgeDocModule { }
