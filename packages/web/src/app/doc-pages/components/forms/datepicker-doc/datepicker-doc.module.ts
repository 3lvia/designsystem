import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@elvia/elvis-datepicker';
import { DatepickerDocComponent } from './datepicker-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { RouterModule } from '@angular/router';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { ComponentPropertiesTableModule } from 'src/app/shared/component-documentation/component-properties-table/component-properties-table.module';
import { ComponentInstallationModule } from 'src/app/shared/component-documentation/component-installation/component-installation.module';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { DatepickerCegComponent } from './datepicker-ceg/datepicker-ceg.component';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    RouterModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    WhenToUseModule,
    ComponentSubsubsectionModule,
    ComponentPropertiesTableModule,
    ComponentInstallationModule,
    ComponentChangelogModule,
    CegModule,
  ],
  declarations: [DatepickerDocComponent, DatepickerCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DatepickerDocModule {}
