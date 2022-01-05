import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { breadcrumbData } from './breadcrumb-data';
import { breadcrumbEventCode } from './breadcrumb-event-code';

@Component({
  selector: 'app-breadcrumb-doc',
  templateUrl: './breadcrumb-doc.component.html',
  styleUrls: ['./breadcrumb-doc.component.scss'],
})
export class BreadcrumbDocComponent {
  figmaUrl = getComponent('breadcrumb').figmaUrl;
  description = getComponent('breadcrumb').description;
  componentData = breadcrumbData;
  breadcrumbEventCode = breadcrumbEventCode;

  exampleBreadcrumb = [
    {
      url: 'https://design.elvia.io/components/breadcrumb',
      title: 'Example',
    },
  ];

  breadcrumbsTest = [
    {
      url: 'https://design.elvia.io/',
      title: 'Home',
    },
    {
      url: 'https://design.elvia.io/components',
      title: 'Components',
    },
    {
      url: 'https://design.elvia.io/components/breadcrumb',
      title: 'Breadcrumbs',
    },
  ];

  does = ['Need help to navigate between multiple levels'];
  donts = [
    'Sites with flat structure',
    'To show progress of a journey',
    'Should not replace the primary navigation',
  ];
}
