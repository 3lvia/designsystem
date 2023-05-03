import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@elvia/elvis-modal';
import '@elvia/elvis-carousel';
import { ModalDocComponent } from './modal-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { ComponentPropertiesTableModule } from 'src/app/shared/component-documentation/component-properties-table/component-properties-table.module';
import { ComponentInstallationModule } from 'src/app/shared/component-documentation/component-installation/component-installation.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { RouterModule } from '@angular/router';
import { ModalCegComponent } from './modal-ceg/modal-ceg.component';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { ModalMultiplePagesCegComponent } from './modal-multiple-pages-ceg/modal-multiple-pages-ceg.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ComponentHeaderModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    ComponentPropertiesTableModule,
    ComponentInstallationModule,
    WhenToUseModule,
    ComponentChangelogModule,
    CegModule,
  ],
  declarations: [ModalDocComponent, ModalCegComponent, ModalMultiplePagesCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModalDocModule {}
