import { Component, ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-alert-messages',
  templateUrl: './alert-messages.component.html',
  styleUrls: ['./alert-messages.component.scss'],
})
export class AlertMessagesComponent {
  @ViewChild('alertAccordionExample') alertAccordionExample: ElementRef;

  doesAlertDefault = [
    'Message related to the content of the page.',
    'To correct a problem.',
    'After a user operation.',
  ];

  doesToastDefault = ['Confirmation message after an user action', 'Notification message'];
  dontsToastDefault = ['Error messages'];

  doesGlobalDefault = ['Give a general message to all users across the pages'];
  dontsGlobalDefault = ['After an user action'];

  //Accsesability
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

  doesAriaRoleNoteDefault = ['The alert messages is supplementary', 'The alert is visable on page load'];
  dontsAriaRoleNoteDefault = ['The alert needs to interupt the user', 'The alert is important'];
}
