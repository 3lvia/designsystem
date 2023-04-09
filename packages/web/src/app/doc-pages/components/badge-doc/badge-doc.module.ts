import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@elvia/elvis-badge';
import { BadgeDocComponent } from './badge-doc.component';
import { BadgeCegComponent } from './badge-ceg/badge-ceg.component';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentInstallationModule } from 'src/app/shared/component-documentation/component-installation/component-installation.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentPropertiesTableModule } from 'src/app/shared/component-documentation/component-properties-table/component-properties-table.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { RouterModule } from '@angular/router';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { ButtonBadgeCegComponent } from './button-badge-ceg/button-badge-ceg.component';

@NgModule({
  imports: [
    CegModule,
    CommonModule,
    ComponentChangelogModule,
    ComponentHeaderModule,
    ComponentInstallationModule,
    ComponentPropertiesModule,
    ComponentPropertiesTableModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    RouterModule,
    WhenToUseModule,
  ],
  declarations: [BadgeDocComponent, BadgeCegComponent, ButtonBadgeCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BadgeDocModule {}
