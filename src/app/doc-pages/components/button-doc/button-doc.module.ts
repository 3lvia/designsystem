import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDocComponent } from './button-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';
import { CodeBlockModule } from 'src/app/shared/code-block/code-block.module';
import { CodeHighlighterModule } from 'src/app/shared/code-highlighter/code-highlighter.module';


@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    CodeBlockModule,
    CodeHighlighterModule
  ],
  declarations: [ButtonDocComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
  export class ButtonDocModule { }
