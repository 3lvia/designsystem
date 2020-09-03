import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-alert-messages',
  templateUrl: './alert-messages.component.html',
  styleUrls: ['./alert-messages.component.scss'],
})
export class AlertMessagesComponent {
  figmaUrl = getComponent('alert-messages-doc').figmaUrl;
  description = getComponent('alert-messages-doc').description;
  doesAlertDefault = [
    'Message related to the content of the page.',
    'To correct a problem.',
    'After a user operation.',
  ];

  alertOverviewHTML = `<div class="e-alert e-alert--local">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--remove_circle e-icon--color-red"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Local Alert</div>
    <div class="e-alert__text">
      <div>
        Describe what went wrong
      </div>
    </div>
  </div>
</div>
`;

  exampleAlertDefault = `<div class="e-alert e-alert--local">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--remove_circle e-icon--color-red"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Standard alert</div>
    <div class="e-alert__text">
      <div>Description with a list and an <a class="e-link e-link--inline">inline link.</a></div>
      <ul>
        <li>Bullet point</li>
        <li>Bullet point</li>
        <li>Bullet point</li>
      </ul>
    </div>
    <div class="e-alert__links">
      <a class="e-link" href="https://design.elvia.io">Link 1</a>
      <a class="e-link" href="https://design.elvia.io">Link 2</a>
    </div>
  </div>
</div>
`;

  errorStatus = `<div>
  <div class="e-alert e-alert--local">
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
  <div class="e-alert e-alert--local e-alert--warn">
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

  positiveStatus = `<div>
  <div class="e-alert e-alert--local e-alert--positive">
    <div class="e-alert__icon">
      <i class="e-icon e-icon--check_circle e-icon--color-green"></i>
    </div>
    <div class="e-alert__content">
      <div class="e-alert__title">Positive</div>
      <div class="e-alert__text">Describe what went right.</div>
    </div>
  </div>
</div>
`;

  infoStatus = `<div>
  <div class="e-alert e-alert--local e-alert--info">
    <div class="e-alert__icon">
      <i class="e-icon e-icon--information_circle"></i>
    </div>
    <div class="e-alert__content">
      <div class="e-alert__title">Info</div>
      <div class="e-alert__text">Important information.</div>
    </div>
  </div>
</div>
`;
}
