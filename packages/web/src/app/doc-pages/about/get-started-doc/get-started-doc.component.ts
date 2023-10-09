import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { combineLatest } from 'rxjs';
import { VersionService } from 'src/app/core/services/version.service';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started-doc.component.html',
  styleUrls: ['./get-started-doc.component.scss'],
})
export class GetStartedDocComponent {
  description = getDocPagesNotFromCMS('get-started')?.description;
  title = getDocPagesNotFromCMS('get-started')?.title;
  linkTagCode = '';
  scriptTagCode = '';
  fullHTMLExample = '';
  elvisCssImport = "@use '~@elvia/elvis/css/elvis.min.css';";
  elvisJsImport = "import '@elvia/elvis/elvis.js';";

  constructor(
    private versionService: VersionService,
    private titleService: Title,
  ) {
    this.titleService.setTitle('Get started | Elvia design system');

    combineLatest([this.versionService.getCDNScriptFile(), this.versionService.getCDNStyleFile()])
      .pipe(takeUntilDestroyed())
      .subscribe(([scriptFile, styleFile]) => {
        this.scriptTagCode = scriptFile;
        this.linkTagCode = styleFile;
        this.fullHTMLExample = this.createFullExample(scriptFile, styleFile);
      });
  }

  private createFullExample(scriptFile: string, styleFile: string): string {
    if (styleFile !== '' && scriptFile !== '') {
      return `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    ${styleFile}
</head>
<body>
    ${scriptFile}
</body>
</html>`;
    }

    return '';
  }
}
