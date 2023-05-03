import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { accordionData } from './accordion-data';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-accordion-doc',
  templateUrl: './accordion-doc.component.html',
  styleUrls: ['./accordion-doc.component.scss'],
})
export class AccordionDocComponent {
  componentData = accordionData;
  figmaUrl = getComponent('accordion')?.figmaUrl;
  title = getComponent('accordion')?.title;
  description = getComponent('accordion')?.description;

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
}
