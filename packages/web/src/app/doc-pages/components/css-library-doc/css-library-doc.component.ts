import { Component } from '@angular/core';
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

@Component({
  selector: 'app-css-library-doc',
  templateUrl: './css-library-doc.component.html',
  standalone: true,
  imports: [
    ComponentHeaderComponent,
    ComponentSectionComponent,
    CssLibraryIllustrationComponent,
    ComponentSubsectionComponent,
    CopyComponent,
    ComponentChangelogComponent,
  ],
})
export class CSSLibraryDocComponent {
  componentData: ComponentData = {
    attributes: {},
    name: '',
  };
  changelog = changelogJson.content;
  npmInstall = 'npm install @elvia/elvis';
  yarnAdd = 'yarn add @elvia/elvis';
  importStylesheet = "@use '@elvia/elvis/css/elvis.min.css';";
  importScript = "import '@elvia/elvis/elvis.js';";
  title = getComponent('css-library')?.title;
  description = getComponent('css-library')?.description;

  constructor(private titleService: Title) {
    this.titleService.setTitle('CSS Library | Elvia design system');
  }
}
