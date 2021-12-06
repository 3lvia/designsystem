import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { v2PlaygroundComponent } from './v2-playground.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { DoDontModule } from 'src/app/shared/do-dont/do-dont.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { RouterModule } from '@angular/router';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';

import '@elvia/elvis-accordion';
import '@elvia/elvis-breadcrumb';
import '@elvia/elvis-popover';
import '@elvia/elvis-dropdown';
import '@elvia/elvis-tabs';
import '@elvia/elvis-progress-linear';
import '@elvia/elvis-testing';
import '@elvia/elvis-datepicker';
import '@elvia/elvis-divider';
import '@elvia/elvis-pagination';
import '@elvia/elvis-carousel';
import '@elvia/elvis-chip';
import '@elvia/elvis-box';
import '@elvia/elvis-modal';
import '@elvia/elvis-icon';
import '@elvia/elvis-radio-filter';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    DoDontModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    RouterModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [v2PlaygroundComponent],
})
export class v2PlaygroundModule {}
