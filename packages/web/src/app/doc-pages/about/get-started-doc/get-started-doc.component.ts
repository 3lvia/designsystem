import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { ComponentHeaderComponent } from '../../../shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { CssLibraryIllustrationComponent } from './css-library-illustration/css-library-illustration.component';
import { WebComponentIllustrationComponent } from './web-component-illustration/web-component-illustration.component';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';

const docPage = getDocPagesNotFromCMS('get-started');
@Component({
  selector: 'app-get-started',
  templateUrl: './get-started-doc.component.html',
  styleUrls: ['./get-started-doc.component.scss'],
  standalone: true,
  imports: [
    ComponentHeaderComponent,
    ComponentSectionComponent,
    RouterLink,
    CssLibraryIllustrationComponent,
    WebComponentIllustrationComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GetStartedDocComponent {
  description = docPage.description;
  title = docPage.title;
  elvisCssImport = "@use '@elvia/elvis/css/elvis.min.css';";
  elvisJsImport = "import '@elvia/elvis/elvis.js';";

  constructor(private titleService: Title) {
    this.titleService.setTitle('Get started | Elvia design system');
  }
}
