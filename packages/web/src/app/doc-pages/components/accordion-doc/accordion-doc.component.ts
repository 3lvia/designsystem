import { Component, ViewChild, ElementRef } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { exampleContents } from 'src/app/shared/example-contents';
import { accordionData } from './accodrion-data';

@Component({
  selector: 'app-accordion-doc',
  templateUrl: './accordion-doc.component.html',
  styleUrls: ['./accordion-doc.component.scss'],
})
export class AccordionDocComponent {
  @ViewChild('accordionLiveExample') accordionLiveExample: ElementRef;
  componentData = accordionData;
  examples = exampleContents;
  figmaUrl = getComponent('accordion').figmaUrl;
  description = getComponent('accordion').description;
  showCode = false;

  doesAccordion = [
    'Organize related information.',
    'When you have a lot of content and the content is not important to always have available.',
  ];
  dontsAccordion = [
    'Don’t hide necessary and critical information to the user to complete their task in a accordion.',
    'Don’t use it for navigation elements.',
  ];

  exampleAccordionSingle =
    `<div class="e-accordion e-accordion--single">
  <div class="e-accordion__item">
    <div class="e-accordion__title">
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
    <div class="e-accordion__title">
      Open Accordion
    </div>
    <div class="e-accordion__icon">
      <i class="e-icon e-icon--expand_circle-color"></i>
      <i class="e-icon e-icon--expand_circle-filled-color"></i>
    </div>
    <div class="e-accordion__content">
      ` +
    exampleContents.texts.sm['eng-GBR'].description +
    `
    </div>
  </div>
</div>
`;

  exampleAccordionGroup =
    `<div class="e-accordion e-accordion--group">
  <div class="e-accordion__item">
    <div class="e-accordion__label">
      <div class="e-accordion__title">
        ` +
    exampleContents.texts.xs['eng-GBR'].title +
    `
      </div>
      <div class="e-accordion__icon">
        <i class="e-icon e-icon--expand_circle-color"></i>
        <i class="e-icon e-icon--expand_circle-filled-color"></i>
      </div>
    </div>
    <div class="e-accordion__content">
      Hidden information
    </div>
  </div>
  <div class="e-accordion__item e-accordion__item--open">
    <div class="e-accordion__label">
      <div class="e-accordion__title">
        ` +
    exampleContents.questions.sm['eng-GBR'].question +
    `
      </div>
      <div class="e-accordion__icon">
        <i class="e-icon e-icon--expand_circle-color"></i>
        <i class="e-icon e-icon--expand_circle-filled-color"></i>
      </div>
    </div>
    <div class="e-accordion__content">
      ` +
    exampleContents.questions.sm['eng-GBR'].answer +
    `
    </div>
  </div>
  <div class="e-accordion__item">
    <div class="e-accordion__label">
      <div class="e-accordion__title">
        ` +
    exampleContents.texts.sm['eng-GBR'].title +
    `
      </div>
      <div class="e-accordion__icon">
        <i class="e-icon e-icon--expand_circle-color"></i>
        <i class="e-icon e-icon--expand_circle-filled-color"></i>
      </div>
    </div>
    <div class="e-accordion__content">
      Hidden information
    </div>
  </div>
  <div class="e-accordion__item">
    <div class="e-accordion__label">
      <div class="e-accordion__title">
        ` +
    exampleContents.texts.md['eng-GBR'].title +
    `
      </div>
      <div class="e-accordion__icon">
        <i class="e-icon e-icon--expand_circle-color"></i>
        <i class="e-icon e-icon--expand_circle-filled-color"></i>
      </div>
    </div>
    <div class="e-accordion__content">
      Hidden information
    </div>
  </div>
</div>
`;

  exampleAccordionSizes = `<div class="e-accordion e-accordion--sm">
  <div class="e-accordion__item">
    <div class="e-accordion__title">
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
    <div class="e-accordion__title">
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
    <div class="e-accordion__title">
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
