import { Component } from '@angular/core';

import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { BreadcrumbCegComponent } from './breadcrumb-ceg/breadcrumb-ceg.component';
import { breadcrumbData } from './breadcrumb-data';
import { BreadcrumbEventCegComponent } from './breadcrumb-event-ceg/breadcrumb-event-ceg.component';

@Component({
  selector: 'app-breadcrumb-doc',
  templateUrl: './breadcrumb-doc.component.html',
  styleUrls: ['./breadcrumb-doc.component.scss'],
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    StaticCegComponent,
    BreadcrumbCegComponent,
    ComponentSectionComponent,
    WhenToUseComponent,
    ComponentSubsectionComponent,
    BreadcrumbEventCegComponent,
  ],
})
export class BreadcrumbDocComponent {
  componentData = breadcrumbData;

  exampleBreadcrumb = [
    {
      href: 'https://design.elvia.io/components/breadcrumb',
      text: 'Example',
    },
  ];

  breadcrumbsTest = [
    {
      href: 'https://design.elvia.io/',
      text: 'Home',
    },
    {
      href: 'https://design.elvia.io/components',
      text: 'Components',
    },
    {
      href: 'https://design.elvia.io/components/breadcrumb',
      text: 'Breadcrumbs',
    },
  ];

  does = ['Need help to navigate between multiple levels'];
  donts = [
    'Sites with flat structure',
    'To show progress of a journey',
    'Should not replace the primary navigation',
  ];
}
