import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimepickerDocComponent } from './timepicker-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { ComponentPropertiesTableModule } from 'src/app/shared/component-documentation/component-properties-table/component-properties-table.module';
import { ComponentInstallationModule } from 'src/app/shared/component-documentation/component-installation/component-installation.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { TimepickerCegComponent } from './timepicker-ceg/timepicker-ceg.component';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentChangelogModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    WhenToUseModule,
    ComponentPropertiesTableModule,
    ComponentInstallationModule,
    CegModule,
  ],
  declarations: [TimepickerDocComponent, TimepickerCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TimepickerDocModule {}
