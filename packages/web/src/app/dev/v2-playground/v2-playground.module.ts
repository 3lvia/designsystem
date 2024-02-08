import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { v2PlaygroundComponent } from './v2-playground.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { RouterModule } from '@angular/router';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';

import '@elvia/elvis-accordion';
import '@elvia/elvis-autocomplete';
import '@elvia/elvis-badge';
import '@elvia/elvis-box';
import '@elvia/elvis-breadcrumb';
import '@elvia/elvis-card';
import '@elvia/elvis-carousel';
import '@elvia/elvis-chip';
import '@elvia/elvis-context-menu';
import '@elvia/elvis-datepicker';
import '@elvia/elvis-datepicker-range';
import '@elvia/elvis-divider';
import '@elvia/elvis-dropdown';
import '@elvia/elvis-header';
import '@elvia/elvis-icon';
import '@elvia/elvis-illustrations/went-wrong';
import '@elvia/elvis-illustrations/hello';
import '@elvia/elvis-illustrations/no-results';
import '@elvia/elvis-illustrations/data-is-coming';
import '@elvia/elvis-illustrations/no-connection';
import '@elvia/elvis-illustrations/nothing-new';
import '@elvia/elvis-illustrations/photo';
import '@elvia/elvis-illustrations/new';
import '@elvia/elvis-illustrations/no-notifications';
import '@elvia/elvis-illustrations/no-position';
import '@elvia/elvis-illustrations/statistics';
import '@elvia/elvis-illustrations/confirmation';
import '@elvia/elvis-illustrations/cant-load-data';
import '@elvia/elvis-illustrations/explanation';
import '@elvia/elvis-illustrations/connected';
import '@elvia/elvis-illustrations/financial-aid';
import '@elvia/elvis-illustrations/hidden';
import '@elvia/elvis-illustrations/fastleddstrinn';
import '@elvia/elvis-illustrations/business';
import '@elvia/elvis-illustrations/lock-key';
import '@elvia/elvis-illustrations/waiting';
import '@elvia/elvis-illustrations/sharing';
import '@elvia/elvis-modal';
import '@elvia/elvis-outline';
import '@elvia/elvis-pagination';
import '@elvia/elvis-popover';
import '@elvia/elvis-progress-linear';
import '@elvia/elvis-radio-filter';
import '@elvia/elvis-segmented-control';
import '@elvia/elvis-slider';
import '@elvia/elvis-spotlight';
import '@elvia/elvis-stepper';
import '@elvia/elvis-tabs';
import '@elvia/elvis-timepicker';
import '@elvia/elvis-toast';
import '@elvia/elvis-tooltip';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    RouterModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [v2PlaygroundComponent],
})
export class v2PlaygroundModule {}
