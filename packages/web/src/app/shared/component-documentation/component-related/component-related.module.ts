import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentRelatedComponent } from './component-related.component';
import '@elvia/elvis-card';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ComponentRelatedComponent],
  exports: [ComponentRelatedComponent],
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentRelatedModule {}
