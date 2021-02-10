import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentExampleV1Component } from './component-example-v1.component';
import { ComponentExampleCodeModule } from '../component-example-code/component-example-code.module';
import { IframeScreenModule } from '../../../iframe-screen/iframe-screen.module';
import { ComponentExampleAccordionModule } from '../component-example-accordion/component-example-accordion.module';

@NgModule({
  imports: [CommonModule, ComponentExampleCodeModule, IframeScreenModule, ComponentExampleAccordionModule],
  declarations: [ComponentExampleV1Component],
  exports: [ComponentExampleV1Component],
})
export class ComponentExampleV1Module {}
