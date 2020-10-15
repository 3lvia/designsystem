import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeBlockAccordionComponent } from './code-block-accordion.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [CodeBlockAccordionComponent],
  declarations: [CodeBlockAccordionComponent],
})
export class CodeBlockAccordionModule { }
