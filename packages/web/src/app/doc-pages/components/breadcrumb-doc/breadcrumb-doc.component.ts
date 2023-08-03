import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { breadcrumbData } from './breadcrumb-data';
import { breadcrumbEventCode } from './breadcrumb-event-code';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumb-doc',
  templateUrl: './breadcrumb-doc.component.html',
  styleUrls: ['./breadcrumb-doc.component.scss'],
})
export class BreadcrumbDocComponent {
  title = getComponent('breadcrumb')?.title;
  componentData = breadcrumbData;
  breadcrumbEventCode = breadcrumbEventCode;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

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
