import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import changelogJson from '@elvia/elvis/CHANGELOG.json';
import { VersionService } from '../../../core/services/version.service';
import ComponentData from '../component-data.interface';
import { getComponent } from 'src/app/shared/doc-pages';
import { ComponentChangelogComponent } from '../../../shared/component-documentation/component-changelog/component-changelog.component';
import { CopyComponent } from '../../../shared/copy/copy.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { CssLibraryIllustrationComponent } from './css-library-illustration/css-library-illustration.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentHeaderComponent } from '../../../shared/component-documentation/component-structure/component-header/component-header.component';

@Component({
    selector: 'app-css-library-doc',
    templateUrl: './css-library-doc.component.html',
    styleUrls: ['./css-library-doc.component.scss'],
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
  linkTagCode = '';
  scriptTagCode = '';
  title = getComponent('css-library')?.title;
  description = getComponent('css-library')?.description;

  constructor(
    private versionService: VersionService,
    private titleService: Title,
  ) {
    this.titleService.setTitle('CSS Library | Elvia design system');

    combineLatest([this.versionService.getCDNScriptFile(), this.versionService.getCDNStyleFile()])
      .pipe(takeUntilDestroyed())
      .subscribe(([scriptFile, styleFile]) => {
        this.scriptTagCode = scriptFile;
        this.linkTagCode = styleFile;
      });
  }
}
