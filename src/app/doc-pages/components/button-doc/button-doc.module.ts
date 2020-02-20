import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDocComponent } from './button-doc.component';
import { ComponentExampleModule } from 'src/app/shared/component-example/component-example.module';
import { ComponentHeaderModule } from 'src/app/shared/component-header/component-header.module';
import { CodeHighlighterModule } from 'src/app/shared/code-highlighter/code-highlighter.module';


@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentExampleModule,
    CodeHighlighterModule,
  ],
  declarations: [ButtonDocComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
  export class ButtonDocModule { }
