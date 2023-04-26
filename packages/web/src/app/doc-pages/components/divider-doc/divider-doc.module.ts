import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@elvia/elvis-divider';
import { DividerDocComponent } from './divider-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentPropertiesTableModule } from 'src/app/shared/component-documentation/component-properties-table/component-properties-table.module';
import { ComponentInstallationModule } from 'src/app/shared/component-documentation/component-installation/component-installation.module';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { RouterModule } from '@angular/router';
import { DividerCegComponent } from './divider-ceg/divider-ceg.component';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentPropertiesTableModule,
    ComponentInstallationModule,
    ComponentChangelogModule,
    CegModule,
    RouterModule,
  ],
  declarations: [DividerDocComponent, DividerCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DividerDocModule {}
