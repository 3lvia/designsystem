import { Component } from '@angular/core';
import { accordionData } from './accordion-data';
import { AccordionGroupCegComponent } from './accordion-group-ceg/accordion-group-ceg.component';
import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { RouterLink } from '@angular/router';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { AccordionCegComponent } from './accordion-ceg/accordion-ceg.component';
import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';

@Component({
  selector: 'app-accordion-doc',
  templateUrl: './accordion-doc.component.html',
  styleUrls: ['./accordion-doc.component.scss'],
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    AccordionCegComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    WhenToUseComponent,
    RouterLink,
    StaticCegComponent,
    AccordionGroupCegComponent,
  ],
})
export class AccordionDocComponent {
  componentData = accordionData;

  doesAccordion = [
    'Organize related information.',
    'When you have a lot of content and the content is not important to always have available.',
  ];
  dontsAccordion = [
    'Don’t hide necessary and critical information to the user to complete their task in a accordion.',
    'Don’t use it for navigation elements.',
  ];
}
