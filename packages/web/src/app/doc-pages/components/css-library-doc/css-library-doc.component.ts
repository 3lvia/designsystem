import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import changelogJson from '@elvia/elvis/CHANGELOG.json';

import { ComponentChangelogComponent } from '../../../shared/component-documentation/component-changelog/component-changelog.component';
import { ComponentHeaderComponent } from '../../../shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { CopyComponent } from '../../../shared/copy/copy.component';
import ComponentData from '../component-data.interface';
import { CssLibraryIllustrationComponent } from './css-library-illustration/css-library-illustration.component';
import { getComponent } from 'src/app/shared/doc-pages';

const docPage = getComponent('css-library');
@Component({
  selector: 'app-css-library-doc',
  templateUrl: './css-library-doc.component.html',
  imports: [
    ComponentHeaderComponent,
    ComponentSectionComponent,
    CssLibraryIllustrationComponent,
    ComponentSubsectionComponent,
    CopyComponent,
    ComponentChangelogComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CSSLibraryDocComponent {
  componentData: ComponentData = {
    attributes: {},
    name: '',
  };
  changelog = changelogJson.content;
  npmInstall = 'npm install @elvia/elvis';
  yarnAdd = 'yarn add @elvia/elvis';
  importStylesheet = "@import '@elvia/elvis/css/elvis.min.css';";
  importCSSReset = "@import '@elvia/elvis/css/css-reset.css';";
  importScript = "import '@elvia/elvis/elvis.js';";
  importDeprecationScript = "import '@elvia/elvis/checkDeprecations.js';";
  title = docPage.title;
  description = docPage.description;

  constructor(private titleService: Title) {
    this.titleService.setTitle('CSS Library | Elvia design system');
  }
}
