import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';
import { VersionService } from 'src/app/core/services/version.service';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started-doc.component.html',
  styleUrls: ['./get-started-doc.component.scss'],
})
export class GetStartedDocComponent {
  linkTagCode = '';
  scriptTagCode = '';
  fullHTMLExample = '';
  bodyScriptMessage = `<body><script src="assets/js/elvis.js"></script></body>`;

  constructor(private versionService: VersionService, private titleService: Title) {
    this.titleService.setTitle('Get started | Elvia design system');

    combineLatest([
      this.versionService.getCDNScriptFile().pipe(tap((script) => (this.scriptTagCode = script))),
      this.versionService.getCDNStyleFile().pipe(tap((style) => (this.linkTagCode = style))),
    ])
      .pipe(takeUntilDestroyed())
      .subscribe(([scriptFile, styleFile]) => {
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
