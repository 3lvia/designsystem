import { Component } from '@angular/core';
import { cssLibraryData } from './css-library-data';
import changelogJson from '@elvia/elvis/CHANGELOG.json';
import { VersionService } from '../../../core/services/version.service';
import { Title } from '@angular/platform-browser';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-css-library-doc',
  templateUrl: './css-library-doc.component.html',
  styleUrls: ['./css-library-doc.component.scss'],
})
export class CSSLibraryDocComponent {
  componentData = cssLibraryData;
  changelog = changelogJson.content;
  npmInstall = 'npm install @elvia/elvis';
  yarnAdd = 'yarn add @elvia/elvis';
  importStylesheet = "@use '@elvia/elvis/css/elvis.min.css';";
  importScript = "import '@elvia/elvis/elvis.js';";
  linkTagCode = '';
  scriptTagCode = '';

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
