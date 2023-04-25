import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@elvia/elvis-dropdown';
import { DropdownDocComponent } from './dropdown-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentPropertiesTableModule } from 'src/app/shared/component-documentation/component-properties-table/component-properties-table.module';
import { ComponentInstallationModule } from 'src/app/shared/component-documentation/component-installation/component-installation.module';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { RouterModule } from '@angular/router';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { DropdownCegComponent } from './dropdown-ceg/dropdown-ceg.component';
import { DropdownIconsCegComponent } from './dropdown-icons-ceg/dropdown-icons-ceg.component';
import { DropdownTreeCegComponent } from './dropdown-tree-ceg/dropdown-tree-ceg.component';
import { DropdownLoadMoreCegComponent } from './dropdown-load-more-ceg/dropdown-load-more-ceg.component';
import { DropdownStatusCegComponent } from './dropdown-status-ceg/dropdown-status-ceg.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentPropertiesTableModule,
    ComponentInstallationModule,
    WhenToUseModule,
    RouterModule,
    ComponentChangelogModule,
    CegModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    DropdownDocComponent,
    DropdownCegComponent,
    DropdownIconsCegComponent,
    DropdownTreeCegComponent,
    DropdownLoadMoreCegComponent,
    DropdownStatusCegComponent,
  ],
})
export class DropdownDocModule {}
