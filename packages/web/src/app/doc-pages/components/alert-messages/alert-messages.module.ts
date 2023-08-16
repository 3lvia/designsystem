import { NgModule } from '@angular/core';
import { AlertMessagesComponent } from './alert-messages.component';
import { AlertCegComponent } from './alert-ceg/alert-ceg.component';
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
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

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
  imports: [SharedDocumentationModule],
})
export class AlertMessagesModule {}
