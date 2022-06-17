import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentExampleGeneratorComponent } from './component-example-generator.component';
import { ComponentExampleCodeModule } from '../component-example-code/component-example-code.module';
import { CegFiltersModule } from './ceg-filters/ceg-filters.module';
import '@elvia/elvis-dropdown';
import '@elvia/elvis-popover';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ComponentExampleCodeModule, CegFiltersModule, FormsModule],
  declarations: [ComponentExampleGeneratorComponent],
  exports: [ComponentExampleGeneratorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentExampleGeneratorModule {}
