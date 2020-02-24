import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDocComponent } from './table-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CodeBlockModule
  ],
  declarations: [TableDocComponent]
})
export class TableDocModule { }
