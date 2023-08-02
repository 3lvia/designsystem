import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentRelatedComponent } from './component-related.component';
import '@elvia/elvis-card';
import { ComponentRelatedNamePipe } from './component-related-name-pipe';
import { ComponentRelatedUrlPipe } from './component-related-url-pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ComponentRelatedComponent, ComponentRelatedNamePipe, ComponentRelatedUrlPipe],
  exports: [ComponentRelatedComponent, ComponentRelatedNamePipe, ComponentRelatedUrlPipe],
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentRelatedModule {}
