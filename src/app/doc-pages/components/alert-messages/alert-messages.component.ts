import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-alert-messages',
  templateUrl: './alert-messages.component.html',
  styleUrls: ['./alert-messages.component.scss']
})
export class AlertMessagesComponent {

  componentStatus = getComponent('alert-messages-doc').status;
  externalUrl = getComponent('alert-messages-doc').externalUrl;
  doesAlertDefault = ['Message related to the content of the page.', 'To correct a problem.', 'After a user operation.'];

  exampleAlertDefault = `<h3 class="e-title-sm">Standard</h3>
<div class="e-alert e-alert--local e-m-8">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--remove_circle e-icon--color-red"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Kort tittel</div>
    <div class="e-alert__text">Beskriv hva som gikk galt</div>
  </div>
</div>

<h3 class="e-title-sm">Without title</h3>
<div class="e-alert e-alert--local e-alert--no-title e-m-8">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--remove_circle e-icon--color-red"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__text">Enkel alert uten title</div>
  </div>
</div>

<h3 class="e-title-sm">With list</h3>
<div class="e-alert e-alert--local e-m-8">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--remove_circle e-icon--color-red"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Kort tittel</div>
    <div class="e-alert__text">
      <ul>
        <li>Liste punkt</li>
        <li>Liste punkt</li>
        <li>Liste punkt</li>
      </ul>
    </div>
  </div>
</div>

<h3 class="e-title-sm">With links</h3>
<div class="e-alert e-alert--local e-m-8">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--remove_circle e-icon--color-red"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Kort tittel</div>
    <div class="e-alert__text">
      Beskriv hva som gikk galt sammen med en eller flere links.
    </div>
    <div class="e-alert__links">
      <a class="e-link" href="https://www.elvia.no/">Link 1</a>
      <a class="e-link" href="https://www.elvia.no/">Link 2</a>
    </div>
  </div>
</div>

<h3 class="e-title-sm">With inline link</h3>
<div class="e-alert e-alert--local e-m-8">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--remove_circle e-icon--color-red"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Kort tittel</div>
    <div class="e-alert__text">
      Beskriv hva som gikk galt sammen med en <a class="e-link e-link--inline">inline link.</a>
    </div>
  </div>
</div>`;

  exampleAlertStatuses = `<div class="e-alert e-alert--local e-m-8">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--remove_circle e-icon--color-red"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Danger</div>
    <div class="e-alert__text">Beskriv hva som gikk galt</div>
  </div>
</div>
<div class="e-alert e-alert--local e-alert--warn e-m-8">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--warning_circle e-icon--color-orange"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Warn</div>
    <div class="e-alert__text">Beskriv hva som kan gå galt</div>
  </div>
</div>
<div class="e-alert e-alert--local e-alert--positive e-m-8">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--check_circle e-icon--color-green"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Positive</div>
    <div class="e-alert__text">Beskriv hva som gikk bra</div>
  </div>
</div>
<div class="e-alert e-alert--local e-alert--info e-m-8">
  <div class="e-alert__icon">
    <i class="e-icon e-icon--information_circle"></i>
  </div>
  <div class="e-alert__content">
    <div class="e-alert__title">Info</div>
    <div class="e-alert__text">Informasjon om noe viktig</div>
  </div>
</div>`;

}
