import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeBlockComponent } from './code-block.component';
import { CodeHighlighterModule } from '../code-highlighter/code-highlighter.module';
import { IframeScreenModule } from '../iframe-screen/iframe-screen.module';


@NgModule({
  imports: [
    CommonModule,
    CodeHighlighterModule,
    IframeScreenModule,
  ],
  declarations: [CodeBlockComponent],
  exports: [CodeBlockComponent],
})
export class CodeBlockModule { }
