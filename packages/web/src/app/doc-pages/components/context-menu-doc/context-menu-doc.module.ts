import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentInstallationModule } from 'src/app/shared/component-documentation/component-installation/component-installation.module';
import { ComponentPropertiesTableModule } from 'src/app/shared/component-documentation/component-properties-table/component-properties-table.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { ContextMenuDocComponent } from './context-menu-doc.component';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { ContextMenuCegComponent } from './context-menu-ceg/context-menu-ceg.component';
import { ContextMenuHeadingsCegComponent } from './context-menu-headings-ceg/context-menu-headings-ceg.component';
import { ContextMenuIconsCegComponent } from './context-menu-icons-ceg/context-menu-icons-ceg.component';
import { ContextMenuSelectableCegComponent } from './context-menu-selectable-ceg/context-menu-selectable-ceg.component';
import { ContextMenuDisabledCegComponent } from './context-menu-disabled-ceg/context-menu-disabled-ceg.component';
import '@elvia/elvis-context-menu';

@NgModule({
  imports: [
    CommonModule,
    CegModule,
    ComponentChangelogModule,
    ComponentHeaderModule,
    ComponentInstallationModule,
    ComponentPropertiesTableModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    WhenToUseModule,
  ],
  declarations: [
    ContextMenuDocComponent,
    ContextMenuCegComponent,
    ContextMenuHeadingsCegComponent,
    ContextMenuIconsCegComponent,
    ContextMenuSelectableCegComponent,
    ContextMenuDisabledCegComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContextMenuDocModule {}
