import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDocComponent } from './dropdown-doc.component';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CodeBlockModule
  ],
  declarations: [DropdownDocComponent]
})
export class DropdownDocModule { }
