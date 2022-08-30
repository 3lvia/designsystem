import { Component, ViewChild, ElementRef } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { exampleContents } from 'src/app/shared/example-contents';

@Component({
  selector: 'app-accordion-group-doc',
  templateUrl: './accordion-group-doc.component.html',
  styleUrls: ['./accordion-group-doc.component.scss'],
})
export class AccordionGroupDocComponent {
  @ViewChild('accordionLiveExample') accordionLiveExample: ElementRef;
  exampleContents = exampleContents;
  figmaUrl = getComponent('accordion-group').figmaUrl;
  description = getComponent('accordion-group').description;
  showCode = false;

  doesAccordion = [
    'Organize related information.',
    'When you have a lot of content and the content is not important to always have available.',
  ];
  dontsAccordion = [
    'Don’t hide necessary and critical information to the user to complete their task in a accordion.',
    'Don’t use it for navigation elements.',
  ];

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
        <i class="e-icon e-icon--expand_circle-color" aria-hidden="true"></i>
        <i class="e-icon e-icon--expand_circle-filled-color" aria-hidden="true"></i>
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
        <i class="e-icon e-icon--expand_circle-color" aria-hidden="true"></i>
        <i class="e-icon e-icon--expand_circle-filled-color" aria-hidden="true"></i>
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
        <i class="e-icon e-icon--expand_circle-color" aria-hidden="true"></i>
        <i class="e-icon e-icon--expand_circle-filled-color" aria-hidden="true"></i>
      </div>
    </div>
    <div class="e-accordion__content">
      Hidden information
    </div>
  </div>
</div>
`;

  toggleOpen(): void {
    if (this.accordionLiveExample.nativeElement.classList.contains('e-accordion__item--open')) {
      this.accordionLiveExample.nativeElement.classList.remove('e-accordion__item--open');
    } else {
      this.accordionLiveExample.nativeElement.classList.add('e-accordion__item--open');
    }
  }
}
