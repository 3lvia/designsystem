import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentExampleV1Component } from './component-example-v1.component';
import { CodeHighlighterModule } from '../component-example-code/component-example-code.module';
import { IframeScreenModule } from '../../../iframe-screen/iframe-screen.module';
import { CodeBlockAccordionModule } from '../component-example-accordion/component-example-accordion.module';

@NgModule({
  imports: [CommonModule, CodeHighlighterModule, IframeScreenModule, CodeBlockAccordionModule],
  declarations: [ComponentExampleV1Component],
  exports: [ComponentExampleV1Component],
})
export class CodeBlockModule {}
