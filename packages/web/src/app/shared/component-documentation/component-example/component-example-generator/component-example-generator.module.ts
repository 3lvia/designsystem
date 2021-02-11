import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentExampleGeneratorComponent } from './component-example-generator.component';
import { ComponentExampleCodeModule } from '../component-example-code/component-example-code.module';
import { ComponentExampleAccordionModule } from '../component-example-accordion/component-example-accordion.module';
import { CegFiltersModule } from './ceg-filters/ceg-filters.module';

@NgModule({
  imports: [CommonModule, ComponentExampleCodeModule, ComponentExampleAccordionModule, CegFiltersModule],
  declarations: [ComponentExampleGeneratorComponent],
  exports: [ComponentExampleGeneratorComponent],
})
export class ComponentExampleGeneratorModule {}
