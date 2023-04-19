import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccordionDocComponent } from './accordion-doc.component';
import { AccordionCegComponent } from './accordion-ceg/accordion-ceg.component';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { ComponentInstallationModule } from 'src/app/shared/component-documentation/component-installation/component-installation.module';
import { ComponentPropertiesTableModule } from 'src/app/shared/component-documentation/component-properties-table/component-properties-table.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { AccordionGroupCegComponent } from './accordion-group-ceg/accordion-group-ceg.component';
import '@elvia/elvis-accordion';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    CegModule,
    ComponentHeaderModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentInstallationModule,
    ComponentPropertiesTableModule,
    ComponentChangelogModule,
    WhenToUseModule,
  ],
  declarations: [AccordionDocComponent, AccordionCegComponent, AccordionGroupCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccordionDocModule {}
