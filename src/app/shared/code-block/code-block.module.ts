import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeBlockComponent } from './code-block.component';
import { CodeHighlighterModule } from '../code-highlighter/code-highlighter.module';
import { SmartphoneModule } from '../smartphone/smartphone.module';


@NgModule({
  imports: [
    CommonModule,
    CodeHighlighterModule,
    SmartphoneModule
  ],
  declarations: [CodeBlockComponent],
  exports: [CodeBlockComponent]
})
export class CodeBlockModule { }
