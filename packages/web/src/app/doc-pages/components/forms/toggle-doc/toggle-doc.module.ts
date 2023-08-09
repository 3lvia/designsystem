import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleDocComponent } from './toggle-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentChangelogModule } from 'src/app//shared/component-documentation/component-changelog/component-changelog.module';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { ToggleCegComponent } from './toggle-ceg/toggle-ceg.component';
import { ToggleLabelCegComponent } from './toggle-label-ceg/toggle-label-ceg.component';
import { ToggleStatesCegComponent } from './toggle-states-ceg/toggle-states-ceg.component';
import { ToggleSizeMdCegComponent } from './toggle-size-md-ceg/toggle-size-md-ceg.component';
import { ToggleSizeSmCegComponent } from './toggle-size-sm-ceg/toggle-size-sm-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  declarations: [
    ToggleDocComponent,
    ToggleCegComponent,
    ToggleLabelCegComponent,
    ToggleStatesCegComponent,
    ToggleSizeMdCegComponent,
    ToggleSizeSmCegComponent,
  ],
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    WhenToUseModule,
    ComponentChangelogModule,
    CegModule,
    SharedDocumentationModule,
  ],
})
export class ToggleDocModule {}
