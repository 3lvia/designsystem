import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertMessagesComponent } from './alert-messages.component';
import { ComponentChangelogModule } from '../../../shared/component-documentation/component-changelog/component-changelog.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { AlertCegComponent } from './alert-ceg/alert-ceg.component';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { AlertGlobalCegComponent } from './alert-global-ceg/alert-global-ceg.component';
import { AlertGlobalClosableCegComponent } from './alert-global-closable-ceg/alert-global-closable-ceg.component';
import { AlertGlobalExpandableCegComponent } from './alert-global-expandable-ceg/alert-global-expandable-ceg.component';
import { AlertGlobalActionsCegComponent } from './alert-global-actions-ceg/alert-global-actions-ceg.component';
import { AlertGlobalNoTitleCegComponent } from './alert-global-no-title-pandable-ceg/alert-global-no-title-ceg.component';
import { AlertLocalCegComponent } from './alert-local-ceg/alert-local-ceg.component';
import { AlertLocalNoTitleCegComponent } from './alert-local-no-title-ceg/alert-local-no-title-ceg.component';
import { AlertRoleAlertCegComponent } from './alert-role-alert-ceg/alert-role-alert-ceg.component';
import { AlertRoleStatusCegComponent } from './alert-role-status-ceg/alert-role-status-ceg.component';
import { AlertRoleNoteCegComponent } from './alert-role-note-ceg/alert-role-note-ceg.component';

@NgModule({
  declarations: [
    AlertMessagesComponent,
    AlertCegComponent,
    AlertGlobalCegComponent,
    AlertGlobalClosableCegComponent,
    AlertGlobalExpandableCegComponent,
    AlertGlobalActionsCegComponent,
    AlertGlobalNoTitleCegComponent,
    AlertLocalCegComponent,
    AlertLocalNoTitleCegComponent,
    AlertRoleAlertCegComponent,
    AlertRoleStatusCegComponent,
    AlertRoleNoteCegComponent,
  ],
  imports: [
    CommonModule,
    CegModule,
    ComponentHeaderModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    WhenToUseModule,
    ComponentChangelogModule,
  ],
})
export class AlertMessagesModule {}
