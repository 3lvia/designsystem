import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import changelogJson from '@elvia/elvis/CHANGELOG.json';
import { VersionService } from '../../../core/services/version.service';
import ComponentData from '../component-data.interface';

@Component({
  selector: 'app-css-library-doc',
  templateUrl: './css-library-doc.component.html',
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
