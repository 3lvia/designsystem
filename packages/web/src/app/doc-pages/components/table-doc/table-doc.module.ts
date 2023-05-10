import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { ComponentExampleV1Module } from 'src/app/shared/component-documentation/component-example/component-example-v1/component-example-v1.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { TableDocComponent } from './table-doc.component';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { TableCegComponent } from './table-ceg/table-ceg.component';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { TableSizeNormalDesktopCegComponent } from './table-size-normal-desktop-ceg/table-size-normal-desktop-ceg.component';
import { TableSizeNormalMobileCegComponent } from './table-size-normal-mobile-ceg/table-size-normal-mobile-ceg.component';
import { TableSizeCompactDesktopCegComponent } from './table-size-compact-desktop-ceg/table-size-compact-desktop-ceg.component';
import { TableSizeCompactMobileCegComponent } from './table-size-compact-mobile-ceg/table-size-compact-mobile-ceg.component';

@NgModule({
  declarations: [
    TableDocComponent,
    TableCegComponent,
    TableSizeNormalDesktopCegComponent,
    TableSizeNormalMobileCegComponent,
    TableSizeCompactDesktopCegComponent,
    TableSizeCompactMobileCegComponent,
  ],
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentExampleV1Module,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    WhenToUseModule,
    RouterModule,
    ComponentChangelogModule,
    CegModule,
  ],
})
export class TableDocModule {}
