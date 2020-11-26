import { Component, ElementRef, ViewChild } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-alert-messages',
  templateUrl: './alert-messages.component.html',
  styleUrls: ['./alert-messages.component.scss'],
})
export class AlertMessagesComponent {

  @ViewChild('alertAccordionExample') alertAccordionExample: ElementRef;

  figmaUrl = getComponent('alert-messages').figmaUrl;
  description = getComponent('alert-messages').description;

  doesAlertDefault = [
    'Message related to the content of the page.',
    'To correct a problem.',
    'After a user operation.',
  ];

  doesToastDefault = [
    'Confirmation message after an user action',
    'Notification message',
  ];
  dontsToastDefault = [
    'Error messages',
  ];

  doesGlobalDefault = [
    'Give a general message to all users across the pages',
  ];
  dontsGlobalDefault = [
    'After an user action',
  ];

  alertOverviewHTML = `<div class="e-alert">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--remove_circle e-icon--color-red"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Kort tittel.</div>
    <div class="e-alert__text">
      <div>En beskrivende tekst til local alert.</div>
    </div>
  </div>
</div>
`;

  exampleAlertDefault = `<div class="e-alert">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--remove_circle e-icon--color-red"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Standard alert</div>
    <div class="e-alert__text">
      <div>Description with a list and an <a class="e-link e-link--inline">inline link.</a></div>
        <ul>
          <li>Bullet liste punkt</li>
          <li>Bullet liste punkt</li>
          <li>Bullet liste punkt</li>
        </ul>
      <div class="e-alert__links">
        <a class="e-link e-link--sm" href="https://design.elvia.io">Link 1</a>
        <a class="e-link e-link--sm" href="https://design.elvia.io">Link 2</a>
      </div>
    </div>
  </div>
</div>
`;

  localAlertClosable = `<div class="e-alert e-alert--info">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--information_circle"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Kort info tittel</div>
    <div class="e-alert__text">Generell informasjon til alle brukere på tvers. Generell informasjon til alle brukere på tvers.</div>
  </div>
  <div class="e-alert__close">
    <button class="e-btn e-btn--icon e-btn--sm">
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
    </button>
  </div>
</div>
`;

  localAlertNoTitle = `<div class="e-alert e-alert--info e-alert--no-title">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--information_circle"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__text">Generell informasjon til alle brukere på tvers. Generell informasjon til alle brukere på tvers. Generell informasjon til alle brukere på tvers.</div>
  </div>
  <div class="e-alert__close">
    <button class="e-btn e-btn--icon e-btn--sm">
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
    </button>
  </div>
</div>
`;

  globalAlert = `<div class="e-alert e-alert--global">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--information_circle"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Kort info tittel</div>
    <div class="e-alert__text">Generell informasjon til alle brukere på tvers. Generell informasjon til alle brukere på tvers.</div>
  </div>
</div>
`;

  globalAlertCloseable = `<div class="e-alert e-alert--global">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--information_circle"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Kort info tittel</div>
    <div class="e-alert__text">Generell informasjon til alle brukere på tvers. Generell informasjon til alle brukere på tvers. </div>
  </div>
  <div class="e-alert__close">
    <button class="e-btn e-btn--icon e-btn--sm">
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
    </button>
  </div>
</div>
`;

  globalAlertExpandable = `<div class="e-alert e-alert--global e-alert--expandable">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--information_circle"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">
      <div>Kort info tittel</div>
      <div class="e-alert__accordion">
        <i class="e-icon e-icon--expand_circle-color"></i>
        <i class="e-icon e-icon--expand_circle-filled-color"></i>
      </div>
    </div>
    <div class="e-alert__text">
      <div>Generell informasjon til alle brukere på tvers. Generell informasjon til alle brukere på tvers.</div>
      <div class="e-alert__links">
        <a class="e-link" href="https://design.elvia.io">Medium link</a>
      </div>
    </div>
  </div>
</div>

<div class="e-alert e-alert--global e-alert--expandable e-alert--open e-mt-40">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--information_circle"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">
      <div>Kort info tittel</div>
      <div class="e-alert__accordion">
        <i class="e-icon e-icon--expand_circle-color"></i>
        <i class="e-icon e-icon--expand_circle-filled-color"></i>
      </div>
    </div>
    <div class="e-alert__text">
      <div>Generell informasjon til alle brukere på tvers. Generell informasjon til alle brukere på tvers.</div>
      <div class="e-alert__links">
        <a class="e-link" href="https://design.elvia.io">Medium link</a>
      </div>
    </div>
  </div>
</div>
`;

  globalAlertActions = `<div class="e-alert e-alert--global e-alert--actions">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--information_circle"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__text">Informasjon til alle brukere på tvers av applikasjonen. Informasjon til alle brukere på tvers av applikasjonen.</div>
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

  globalAlertNoTitle = `<div class="e-alert e-alert--global e-alert--no-title">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--information_circle"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__text">Informasjon til alle brukere på tvers av applikasjonen. Informasjon til alle brukere på tvers av applikasjonen. Informasjon til alle brukere på tvers av applikasjonen.</div>
  </div>
  <div class="e-alert__close">
    <button class="e-btn e-btn--icon e-btn--sm">
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
    </button>
  </div>
</div>
`;

  toastAlert = `<div class="e-alert e-alert--toast">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--check_circle e-icon--color-green"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Kort Tittel</div>
    <div class="e-alert__text">En velykket bekreftelses melding!</div>
  </div>
</div>
`;

  toastAlertClosable = `<div class="e-alert e-alert--toast">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--check_circle e-icon--color-green"></i>
  </div>
  <div class="e-alert__content">
    <div>Kort info tittel</div>
    <div class="e-alert__text">En velykket bekreftelses melding en lang og velykket bekreftelse på en lang melding! En velykket bekreftelses melding en lang og velykket bekreftelse på en lang melding!</div>
  </div>
  <div class="e-alert__close">
    <button class="e-btn e-btn--icon e-btn--sm">
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
    </button>
  </div>
</div>
`;

  toastAlertNoTitle = `<div class="e-alert e-alert--toast e-alert--no-title">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--check_circle e-icon--color-green"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__text">En velykket bekreftelses melding en lang og velykket bekreftelse på en lang melding! En velykket bekreftelses melding en lang og velykket bekreftelse på en lang melding!</div>
  </div>
  <div class="e-alert__close">
    <button class="e-btn e-btn--icon e-btn--sm">
      <span class="e-btn__icon"><i class="e-icon e-icon--close-bold"></i></span>
    </button>
  </div>
</div>
`;

  toastAlertInfo = `<div class="e-alert e-alert--toast e-alert--info">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--information_circle"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Kort Tittel</div>
    <div class="e-alert__text">En informative melding!</div>
  </div>
</div>
`;

  // STATUSES
  errorStatus = `<div>
  <div class="e-alert">
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
  <div class="e-alert e-alert--warn">
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
  <div class="e-alert e-alert--info">
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

  positiveStatus = `<div>
  <div class="e-alert e-alert--toast">
    <div class="e-alert__icon">
      <i class="e-icon e-icon--information_circle"></i>
    </div>
    <div class="e-alert__content">
      <div class="e-alert__title">Positive</div>
      <div class="e-alert__text">Describe what went right.</div>
    </div>
  </div>
</div>
`;
}
