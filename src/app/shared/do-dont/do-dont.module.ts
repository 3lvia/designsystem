import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoDontComponent } from './do-dont.component';
import { CodeHighlighterModule } from '../code-highlighter/code-highlighter.module';

@NgModule({
  imports: [
    CommonModule,
    CodeHighlighterModule
  ],
  exports: [DoDontComponent],
  declarations: [DoDontComponent]
})
export class DoDontModule { }
