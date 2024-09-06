import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChild } from '@angular/core';

import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSubsubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.component';
import { CopyComponent } from '../../../shared/copy/copy.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { AlertCegComponent } from './alert-ceg/alert-ceg.component';
import { AlertGlobalActionsCegComponent } from './alert-global-actions-ceg/alert-global-actions-ceg.component';
import { AlertGlobalCegComponent } from './alert-global-ceg/alert-global-ceg.component';
import { AlertGlobalClosableCegComponent } from './alert-global-closable-ceg/alert-global-closable-ceg.component';
import { AlertLocalCegComponent } from './alert-local-ceg/alert-local-ceg.component';
import { AlertLocalClosableCegComponent } from './alert-local-closable-ceg/alert-local-closable-ceg.component';
import { AlertRoleAlertCegComponent } from './alert-role-alert-ceg/alert-role-alert-ceg.component';
import { AlertRoleNoteCegComponent } from './alert-role-note-ceg/alert-role-note-ceg.component';
import { AlertRoleStatusCegComponent } from './alert-role-status-ceg/alert-role-status-ceg.component';

@Component({
  selector: 'app-alert-messages',
  templateUrl: './alert-messages.component.html',
  styleUrls: ['./alert-messages.component.scss'],
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    StaticCegComponent,
    AlertCegComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    AlertGlobalCegComponent,
    WhenToUseComponent,
    ComponentSubsubsectionComponent,
    AlertGlobalClosableCegComponent,
    AlertGlobalActionsCegComponent,
    AlertLocalCegComponent,
    AlertLocalClosableCegComponent,
    CopyComponent,
    AlertRoleAlertCegComponent,
    AlertRoleStatusCegComponent,
    AlertRoleNoteCegComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AlertMessagesComponent {
  @ViewChild('alertAccordionExample') alertAccordionExample: ElementRef;

  doesAlertDefault = [
    'Message related to the content of the page.',
    'To correct a problem.',
    'After a user operation.',
  ];

  doesToastDefault = ['Confirmation message after a user action', 'Notification message'];
  dontsToastDefault = ['Error messages'];

  doesGlobalDefault = ['Give a general message to all users across the pages'];
  dontsGlobalDefault = ['After a user action'];

  //Accessability
  doesAriaRoleAlertDefault = [
    'Alerts are used occasionally',
    'Situations where immediate attention is required',
  ];
  dontsAriaRoleAlertDefault = [
    'The element needs a keyboard focus',
    'There are a lot of alerts',
    'The alert appears on the page load',
  ];

  doesAriaRoleStatusDefault = [
    'The alert only has advisory information',
    'The alert is not important enough to justify interrupting the user',
  ];
  dontsAriaRoleStatusDefault = ['If an alert requires focus to be moved'];

  doesAriaRoleNoteDefault = ['The alert messages is supplementary', 'The alert is visible on page load'];
  dontsAriaRoleNoteDefault = ['The alert needs to interrupt the user', 'The alert is important'];
}
