import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsDocComponent } from './tabs-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentPropertiesTableModule } from 'src/app/shared/component-documentation/component-properties-table/component-properties-table.module';
import { ComponentInstallationModule } from 'src/app/shared/component-documentation/component-installation/component-installation.module';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { TabsCegComponent } from './tabs-ceg/tabs-ceg.component';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import '@elvia/elvis-tabs';

@NgModule({
  imports: [
    CegModule,
    CommonModule,
    ComponentHeaderModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentPropertiesTableModule,
    ComponentInstallationModule,
    ComponentChangelogModule,
    WhenToUseModule,
  ],
  declarations: [TabsDocComponent, TabsCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TabsDocModule {}
