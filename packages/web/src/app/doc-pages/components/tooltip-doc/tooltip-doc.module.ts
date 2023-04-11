import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDocComponent } from './tooltip-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentInstallationModule } from 'src/app/shared/component-documentation/component-installation/component-installation.module';
import { ComponentPropertiesTableModule } from 'src/app/shared/component-documentation/component-properties-table/component-properties-table.module';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { TooltipCegComponent } from './tooltip-ceg/tooltip-ceg.component';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import '@elvia/elvis-tooltip';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentInstallationModule,
    ComponentPropertiesTableModule,
    ComponentChangelogModule,
    WhenToUseModule,
    CegModule,
  ],
  declarations: [TooltipDocComponent, TooltipCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TooltipDocModule {}
