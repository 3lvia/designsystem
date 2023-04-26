import { Component, ElementRef, ViewChild } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-alert-messages',
  templateUrl: './alert-messages.component.html',
  styleUrls: ['./alert-messages.component.scss'],
})
export class AlertMessagesComponent {
  @ViewChild('alertAccordionExample') alertAccordionExample: ElementRef;

  figmaUrl = getComponent('alert')?.figmaUrl;
  description = getComponent('alert')?.description;
  title = getComponent('alert')?.title;

  doesAlertDefault = [
    'Message related to the content of the page.',
    'To correct a problem.',
    'After a user operation.',
  ];

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

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

  alertOverviewHTML = `<div role="alert">
  <div class="e-alert">
     <div class="e-alert__icon">
        <i class="e-icon e-icon--remove_circle e-icon--color-red" aria-hidden="true"></i>
     </div>
     <div class="e-alert__content">
        <div class="e-alert__title">Short title</div>
        <div class="e-alert__text">
           <div>A descriptive text for local alert.</div>
        </div>
     </div>
  </div>
</div>
`;

  exampleAlertDefault = `<div role="alert">
  <div class="e-alert">
     <div class="e-alert__icon">
        <i class="e-icon e-icon--remove_circle e-icon--color-red" aria-hidden="true"></i>
     </div>
     <div class="e-alert__content">
        <div class="e-alert__title">Short title</div>
        <div class="e-alert__text">
           <div>Description with an <a class="e-link e-link--inline">inline link.</a></div>
        </div>
     </div>
  </div>
</div>
`;

  localAlertNoTitle = `<div class="e-alert e-alert--info e-alert--no-title" role="note">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--information_circle e-icon--color-grey" aria-hidden="true"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__text">
      <div>General information for all users across applications.</div>
      <div class="e-alert__links">
        <a class="e-link e-link--sm" href="https://design.elvia.io">Link 1</a>
        <a class="e-link e-link--sm" href="https://design.elvia.io">Link 2</a>
      </div>
    </div>
  </div>
</div>
`;

  globalAlert = `<div class="e-alert e-alert--global" role="note">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--information_circle e-icon--color-grey" aria-hidden="true"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Short title</div>
    <div class="e-alert__text">General information for all users across applications.</div>
  </div>
</div>
`;

  globalAlertCloseable = `<div class="e-alert e-alert--global" role="note">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--information_circle e-icon--color-grey" aria-hidden="true"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Short title</div>
    <div class="e-alert__text">General information for all users across applications.</div>
  </div>
  <div class="e-alert__close">
    <button class="e-btn e-btn--icon e-btn--sm" aria-label="Lukk alert">
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold" aria-hidden="true"></i></span>
    </button>
  </div>
</div>
`;

  globalAlertExpandable = `<div class="e-alert e-alert--global e-alert--expandable" role="note">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--information_circle e-icon--color-grey" aria-hidden="true"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">
      <div>Short title</div>
      <div class="e-alert__accordion">
        <i class="e-icon e-icon--expand_circle-color" aria-hidden="true"></i>
        <i class="e-icon e-icon--expand_circle-filled-color" aria-hidden="true"></i>
      </div>
    </div>
    <div class="e-alert__text">
      <div>General information for all users across applications.</div>
      <div class="e-alert__links">
        <a class="e-link" href="https://design.elvia.io">Medium link</a>
      </div>
    </div>
  </div>
</div>

<div class="e-alert e-alert--global e-alert--expandable e-alert--open e-mt-40" role="note">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--information_circle e-icon--color-grey" aria-hidden="true"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">
      <div>Short title</div>
      <div class="e-alert__accordion">
        <i class="e-icon e-icon--expand_circle-color" aria-hidden="true"></i>
        <i class="e-icon e-icon--expand_circle-filled-color" aria-hidden="true"></i>
      </div>
    </div>
    <div class="e-alert__text">
      <div>General information for all users across applications.</div>
      <div class="e-alert__links">
        <a class="e-link" href="https://design.elvia.io">Medium link</a>
      </div>
    </div>
  </div>
</div>
`;

  globalAlertActions = `<div class="e-alert e-alert--global e-alert--actions" role="note">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--information_circle e-icon--color-grey" aria-hidden="true"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__text">General information for all users across applications.</div>
    <div class="e-alert__actions">
      <button class="e-btn e-btn--secondary e-btn--sm">
        <span class="e-btn__title">Secondary</span>
      </button>
      <button class="e-btn e-btn--sm">
        <span class="e-btn__title">Primary</span>
      </button>
    </div>
  </div>
</div>
`;

  globalAlertNoTitle = `<div class="e-alert e-alert--global e-alert--no-title" role="note">
  <div class="e-alert__icon">
     <i class="e-icon e-icon--information_circle e-icon--color-grey" aria-hidden="true"></i>
  </div>
  <div class="e-alert__content">
     <div class="e-alert__text">General information for all users across applications.</div>
  </div>
</div>
`;

  roleAlertContainerExample = `<div class="hidden-screen-reader-only-alert-container" role="alert">
  <!-- Update the content inside this div if you want the alert to be announced -->
  <div class="e-alert">
    <div class="e-alert__icon">
      <i class="e-icon e-icon--remove_circle e-icon--color-red" aria-hidden="true"></i>
    </div>
    <div class="e-alert__content">
      <div class="e-alert__title">ARIA: alert role</div>
      <div class="e-alert__text">
        <div>A descriptive text for a local alert that requires immediate attention</div>
      </div>
    </div>
  </div>
</div>`;

  roleStatusContainerExample = `<div class="hidden-screen-reader-only-alert-container" role="status">
  <!-- Update the content inside this div if you want the alert to be announced -->
  <div class="e-alert e-alert--warn">
    <div class="e-alert__icon">
      <i class="e-icon e-icon--warning_circle e-icon--color-orange" aria-hidden="true"></i>
    </div>
    <div class="e-alert__content">
      <div class="e-alert__title">ARIA: status role</div>
      <div class="e-alert__text">A descriptive text that does not require <em>immediate</em> attention</div>
    </div>
  </div>
</div>`;

  roleNoteExample = `<div class="e-alert e-alert--info role="note" e-mt-16">
<div class="e-alert__icon">
  <i class="e-icon e-icon--information_circle e-icon--color-grey" aria-hidden="true"></i>
</div>
<div class="e-alert__content">
  <div class="e-alert__title">Saving tips</div>
  <div class="e-alert__text">
    <div>
      Fill up the washing machine, dishwasher and tumble dryer before switching them on.
    </div>
  </div>
</div>
</div>`;
}
