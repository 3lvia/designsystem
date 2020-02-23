import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDocComponent } from './button-doc.component';
import { CodeHighlighterModule } from 'src/app/shared/code-highlighter/code-highlighter.module';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';


@NgModule({
  imports: [
    CommonModule,
    CodeHighlighterModule,
    CodeBlockModule,
  ],
  declarations: [ButtonDocComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
  export class ButtonDocModule { }
