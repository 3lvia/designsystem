import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SegmentedControlsDocComponent } from './segmented-controls-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentPropertiesTableModule } from 'src/app/shared/component-documentation/component-properties-table/component-properties-table.module';
import { ComponentInstallationModule } from 'src/app/shared/component-documentation/component-installation/component-installation.module';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { SegmentedControlCegComponent } from './segmented-control-ceg/segmented-control-ceg.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    WhenToUseModule,
    ComponentPropertiesTableModule,
    ComponentInstallationModule,
    ComponentChangelogModule,
    CegModule,
  ],
  declarations: [SegmentedControlsDocComponent, SegmentedControlCegComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SegmentedControlsDocModule {}
