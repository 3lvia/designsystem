import { Component } from '@angular/core';
import { breadcrumbData } from './breadcrumb-data';
import { breadcrumbEventCode } from './breadcrumb-event-code';

@Component({
  selector: 'app-breadcrumb-doc',
  templateUrl: './breadcrumb-doc.component.html',
  styleUrls: ['./breadcrumb-doc.component.scss'],
})
export class BreadcrumbDocComponent {
  componentData = breadcrumbData;
  breadcrumbEventCode = breadcrumbEventCode;

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
