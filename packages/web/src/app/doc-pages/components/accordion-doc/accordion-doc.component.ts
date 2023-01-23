import { Component, ViewChild, ElementRef } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { accordionData } from './accodrion-data';
import { Title } from '@angular/platform-browser';
import { accordionGroupData } from './accordion-group-data';

@Component({
  selector: 'app-accordion-doc',
  templateUrl: './accordion-doc.component.html',
  styleUrls: ['./accordion-doc.component.scss'],
})
export class AccordionDocComponent {
  @ViewChild('accordionLiveExample') accordionLiveExample: ElementRef;
  componentData = accordionData;
  accordionGroupData = accordionGroupData;
  figmaUrl = getComponent('accordion').figmaUrl;
  title = getComponent('accordion').title;
  description = getComponent('accordion').description;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  doesAccordion = [
    'Organize related information.',
    'When you have a lot of content and the content is not important to always have available.',
  ];
  dontsAccordion = [
    'Don’t hide necessary and critical information to the user to complete their task in a accordion.',
    'Don’t use it for navigation elements.',
  ];

  doesGroupAccordion = [
    'Organize related information.',
    'When you have a lot of content and the content is not important to always have available.',
  ];
  dontsGroupAccordion = [
    'Don’t hide necessary and critical information to the user to complete their task in a accordion.',
    'Don’t use it for navigation elements.',
  ];
}
