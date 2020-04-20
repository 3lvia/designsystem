import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressbarDocComponent } from './progressbar-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CodeBlockModule
  ],
  declarations: [ProgressbarDocComponent]
})
export class ProgressbarDocModule { }
