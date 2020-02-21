import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeDocComponent } from './badge-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CodeBlockModule
  ],
  declarations: [BadgeDocComponent]
})
export class BadgeDocModule { }
