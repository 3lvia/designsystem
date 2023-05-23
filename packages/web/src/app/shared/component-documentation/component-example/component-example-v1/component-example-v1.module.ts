import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentExampleV1Component } from './component-example-v1.component';
import { ComponentExampleCodeModule } from '../component-example-code/component-example-code.module';
import '@elvia/elvis-accordion';
import '@elvia/elvis-tabs';

@NgModule({
  imports: [CommonModule, ComponentExampleCodeModule],
  declarations: [ComponentExampleV1Component],
  exports: [ComponentExampleV1Component],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentExampleV1Module {}
