import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentExampleV1Component } from './component-example-v1.component';
import { ComponentExampleCodeModule } from '../component-example-code/component-example-code.module';
import { IframeScreenModule } from '../../../iframe-screen/iframe-screen.module';
import '@elvia/elvis-accordion';

@NgModule({
  imports: [CommonModule, ComponentExampleCodeModule, IframeScreenModule],
  declarations: [ComponentExampleV1Component],
  exports: [ComponentExampleV1Component],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentExampleV1Module {}
