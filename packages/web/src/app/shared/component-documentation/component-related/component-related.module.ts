import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentRelatedComponent } from './component-related.component';
import '@elvia/elvis-card';

@NgModule({
  declarations: [ComponentRelatedComponent],
  exports: [ComponentRelatedComponent],
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentRelatedModule {}
