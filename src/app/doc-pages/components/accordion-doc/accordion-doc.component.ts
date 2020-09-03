import { Component, ViewChild, ElementRef } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-accordion-doc',
  templateUrl: './accordion-doc.component.html',
  styleUrls: ['./accordion-doc.component.scss'],
})
export class AccordionDocComponent {

  @ViewChild('accordionLiveExample') accordionLiveExample: ElementRef;

  figmaUrl = getComponent('accordion-doc').figmaUrl;
  description = getComponent('accordion-doc').description;
  showCode = false;

  doesAccordion = [
    'Organize related information.',
    'When you have a lot of content and the content is not important to always have available.',
  ];
  dontsAccordion = [
    'Don’t hide necessary and critical information to the user to complete their task in a accordion.',
    'Don’t use it for navigation elements.',
  ];

  exampleAccordionSingle = `<div class="e-accordion e-accordion--single">
  <div class="e-accordion__item">
    <div class="e-accordion__label">
      Closed Accordion
    </div>
    <div class="e-accordion__icon">
      <i class="e-icon e-icon--expand_circle-color"></i>
      <i class="e-icon e-icon--expand_circle-filled-color"></i>
    </div>
    <div class="e-accordion__content">
      Hidden information
    </div>
  </div>
</div>
<div class="e-accordion e-accordion--single e-mt-40">
  <div class="e-accordion__item  e-accordion__item--open">
    <div class="e-accordion__label">
      Open Accordion
    </div>
    <div class="e-accordion__icon">
      <i class="e-icon e-icon--expand_circle-color"></i>
      <i class="e-icon e-icon--expand_circle-filled-color"></i>
    </div>
    <div class="e-accordion__content">
      Hidden information
    </div>
  </div>
</div>
`;

  exampleAccordionGroup = `<div class="e-accordion e-accordion--group">
  <div class="e-accordion__item">
    <div class="e-accordion__label">
      Hvor ofte kommer fakturaen?
    </div>
    <div class="e-accordion__icon">
      <i class="e-icon e-icon--expand_circle-color"></i>
      <i class="e-icon e-icon--expand_circle-filled-color"></i>
    </div>
    <div class="e-accordion__content">
      Hidden information
    </div>
  </div>
  <div class="e-accordion__item e-accordion__item--open">
    <div class="e-accordion__label">
      Kan jeg bestille på vegne av andre?
    </div>
    <div class="e-accordion__icon">
      <i class="e-icon e-icon--expand_circle-color"></i>
      <i class="e-icon e-icon--expand_circle-filled-color"></i>
    </div>
    <div class="e-accordion__content">
      Hidden information
    </div>
  </div>
  <div class="e-accordion__item">
    <div class="e-accordion__label">
      Hva kan jeg gjøre for å spare strøm?
    </div>
    <div class="e-accordion__icon">
      <i class="e-icon e-icon--expand_circle-color"></i>
      <i class="e-icon e-icon--expand_circle-filled-color"></i>
    </div>
  </div>
  <div class="e-accordion__item">
    <div class="e-accordion__label">
      Hva kan jeg gjøre for å spare strøm?
    </div>
    <div class="e-accordion__icon">
      <i class="e-icon e-icon--expand_circle-color"></i>
      <i class="e-icon e-icon--expand_circle-filled-color"></i>
    </div>
  </div>
</div>
`;

  exampleAccordionSizes = `<div class="e-accordion e-accordion--sm">
  <div class="e-accordion__item">
    <div class="e-accordion__label">
      Small Accordion
    </div>
    <div class="e-accordion__icon">
      <i class="e-icon e-icon--expand_circle-color"></i>
      <i class="e-icon e-icon--expand_circle-filled-color"></i>
    </div>
  </div>
</div>

<div class="e-accordion e-accordion--md e-mt-40">
  <div class="e-accordion__item">
    <div class="e-accordion__label">
      Medium Accordion
    </div>
    <div class="e-accordion__icon">
      <i class="e-icon e-icon--expand_circle-color"></i>
      <i class="e-icon e-icon--expand_circle-filled-color"></i>
    </div>
  </div>
</div>

<div class="e-accordion e-accordion--lg e-mt-40">
  <div class="e-accordion__item">
    <div class="e-accordion__label">
      Large Accordion
    </div>
    <div class="e-accordion__icon">
      <i class="e-icon e-icon--expand_circle-color"></i>
      <i class="e-icon e-icon--expand_circle-filled-color"></i>
    </div>
  </div>
</div>
`;


  liveCodeHTML = `<div class="e-accordion e-accordion--md e-accordion--center">
  <div class="e-accordion__item" #accordionLiveExample>
    <div class="e-accordion__icon" (click)="toggleOpen()">
      <i class="e-icon e-icon--expand_circle-color"></i>
      <i class="e-icon e-icon--expand_circle-filled-color"></i>
    </div>
    <div class="e-accordion__content">
      <div>Hidden information</div>
      <div>Hidden information</div>
      <div>Hidden information</div>
      <div>Hidden information</div>
    </div>
  </div>
</div>
`;

  liveCodeTS = `@ViewChild('accordionLiveExample') accordionLiveExample: ElementRef;

  toggleOpen(): void {
    if (this.accordionLiveExample.nativeElement.classList.contains('e-accordion__item--open')) {
      this.accordionLiveExample.nativeElement.classList.remove('e-accordion__item--open');
    } else {
      this.accordionLiveExample.nativeElement.classList.add('e-accordion__item--open');
    }
  }
`;

  toggleOpen(): void {
    if (this.accordionLiveExample.nativeElement.classList.contains('e-accordion__item--open')) {
      this.accordionLiveExample.nativeElement.classList.remove('e-accordion__item--open');
    } else {
      this.accordionLiveExample.nativeElement.classList.add('e-accordion__item--open');
    }
  }
}

