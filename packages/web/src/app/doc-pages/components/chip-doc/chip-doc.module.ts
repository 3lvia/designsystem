import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipDocComponent } from './chip-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentInstallationModule } from 'src/app/shared/component-documentation/component-installation/component-installation.module';
import { ComponentPropertiesTableModule } from 'src/app/shared/component-documentation/component-properties-table/component-properties-table.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import '@elvia/elvis-chip';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { ChipCegComponent } from './chip-ceg/chip-ceg.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentPropertiesTableModule,
    ComponentInstallationModule,
    CommonModule,
    ComponentChangelogModule,
    WhenToUseModule,
    CegModule,
  ],
  declarations: [ChipDocComponent, ChipCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChipDocModule {}
