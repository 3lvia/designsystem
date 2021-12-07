import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentExampleCodeComponent } from './component-example-code.component';
import '@elvia/elvis-tabs';

@NgModule({
  imports: [CommonModule],
  declarations: [ComponentExampleCodeComponent],
  exports: [ComponentExampleCodeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentExampleCodeModule {}
