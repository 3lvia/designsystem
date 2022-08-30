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

  toggleOpen(): void {
    if (this.accordionLiveExample.nativeElement.classList.contains('e-accordion__item--open')) {
      this.accordionLiveExample.nativeElement.classList.remove('e-accordion__item--open');
    } else {
      this.accordionLiveExample.nativeElement.classList.add('e-accordion__item--open');
    }
  }
}
