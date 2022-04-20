import { Component, ElementRef, ViewChild } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
@Component({
  selector: 'app-alert-messages',
  templateUrl: './alert-messages.component.html',
  styleUrls: ['./alert-messages.component.scss'],
})
export class AlertMessagesComponent {
  @ViewChild('alertAccordionExample') alertAccordionExample: ElementRef;

  figmaUrl = getComponent('alert').figmaUrl;
  description = getComponent('alert').description;

  doesAlertDefault = [
    'Message related to the content of the page.',
    'To correct a problem.',
    'After a user operation.',
  ];

  doesToastDefault = ['Confirmation message after an user action', 'Notification message'];
  dontsToastDefault = ['Error messages'];

  doesGlobalDefault = ['Give a general message to all users across the pages'];
  dontsGlobalDefault = ['After an user action'];

  alertOverviewHTML = `<div class="e-alert" role="alert">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--remove_circle e-icon--color-red"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Short title</div>
    <div class="e-alert__text">
      <div>A descriptive text for local alert.</div>
    </div>
  </div>
</div>
`;

  exampleAlertDefault = `<div class="e-alert" role="alert">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--remove_circle e-icon--color-red"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Short title</div>
    <div class="e-alert__text">
      <div>Description with an <a class="e-link e-link--inline">inline link.</a></div>
    </div>
  </div>
</div>
`;

  localAlertClosable = `<div class="e-alert e-alert--info" role="alert">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--information_circle e-icon--color-grey"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Short title</div>
    <div class="e-alert__text">
      <ul>
        <li>Bullet list</li>
        <li>Bullet list</li>
        <li>Bullet list</li>
      </ul>
    </div>
  </div>
  <div class="e-alert__close">
    <button class="e-btn e-btn--icon e-btn--sm" aria-label="Lukk alert">
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold" aria-hidden="true"></i></span>
    </button>
  </div>
</div>
`;

  localAlertNoTitle = `<div class="e-alert e-alert--info e-alert--no-title" role="alert">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--information_circle e-icon--color-grey"></i>
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

  globalAlert = `<div class="e-alert e-alert--global" role="alert">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--information_circle e-icon--color-grey"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Short title</div>
    <div class="e-alert__text">General information for all users across applications.</div>
  </div>
</div>
`;

  globalAlertCloseable = `<div class="e-alert e-alert--global" role="alert">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--information_circle e-icon--color-grey"></i>
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

  globalAlertExpandable = `<div class="e-alert e-alert--global e-alert--expandable" role="alert">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--information_circle e-icon--color-grey"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">
      <div>Short title</div>
      <div class="e-alert__accordion">
        <i class="e-icon e-icon--expand_circle-color"></i>
        <i class="e-icon e-icon--expand_circle-filled-color"></i>
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

<div class="e-alert e-alert--global e-alert--expandable e-alert--open e-mt-40" role="alert">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--information_circle e-icon--color-grey"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">
      <div>Short title</div>
      <div class="e-alert__accordion">
        <i class="e-icon e-icon--expand_circle-color"></i>
        <i class="e-icon e-icon--expand_circle-filled-color"></i>
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

  globalAlertActions = `<div class="e-alert e-alert--global e-alert--actions" role="alert">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--information_circle e-icon--color-grey"></i>
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

  globalAlertNoTitle = `<div class="e-alert e-alert--global e-alert--no-title" role="alert">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--information_circle e-icon--color-grey"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__text">General information for all users across applications.</div>
  </div>
</div>
`;

  toastAlert = `<div class="e-alert e-alert--toast" role="alert">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--check_circle e-icon--color-green"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Short title</div>
    <div class="e-alert__text">A successful confirmation message.</div>
  </div>
</div>
`;

  toastAlertClosable = `<div class="e-alert e-alert--toast" role="alert">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--check_circle e-icon--color-green"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Short title</div>
    <div class="e-alert__text">A successful confirmation message.</div>
  </div>
  <div class="e-alert__close">
    <button class="e-btn e-btn--icon e-btn--sm" aria-label="Lukk alert">
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold" aria-hidden="true"></i></span>
    </button>
  </div>
</div>
`;

  toastAlertNoTitle = `<div class="e-alert e-alert--toast e-alert--no-title" role="alert">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--check_circle e-icon--color-green"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__text">A successful confirmation message.</div>
  </div>
</div>
`;

  // STATUSES
  errorStatus = `<div>
  <div class="e-alert" role="alert">
    <div class="e-alert__icon">
      <i class="e-icon e-icon--remove_circle e-icon--color-red"></i>
    </div>
    <div class="e-alert__content">
      <div class="e-alert__title">Danger</div>
      <div class="e-alert__text">Describe what went wrong.</div>
    </div>
  </div>
</div>
`;

  warnStatus = `<div>
  <div class="e-alert e-alert--warn" role="alert">
    <div class="e-alert__icon">
      <i class="e-icon e-icon--warning_circle e-icon--color-orange"></i>
    </div>
    <div class="e-alert__content">
      <div class="e-alert__title">Warn</div>
      <div class="e-alert__text">Describe what went wrong.</div>
    </div>
  </div>
</div>
`;

  infoStatus = `<div>
  <div class="e-alert e-alert--info" role="alert">
    <div class="e-alert__icon">
      <i class="e-icon e-icon--information_circle e-icon--color-grey"></i>
    </div>
    <div class="e-alert__content">
      <div class="e-alert__title">Info</div>
      <div class="e-alert__text">Important information.</div>
    </div>
  </div>
</div>
`;

  positiveStatus = `<div>
  <div class="e-alert e-alert--toast" role="alert">
    <div class="e-alert__icon">
      <i class="e-icon e-icon--information_circle e-icon--color-grey"></i>
    </div>
    <div class="e-alert__content">
      <div class="e-alert__title">Positive</div>
      <div class="e-alert__text">Describe what went right.</div>
    </div>
  </div>
</div>
`;
}
