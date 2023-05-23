import { Component } from '@angular/core';
import { VersionService } from 'src/app/core/services/version.service';
import { Title } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  fullExampleCode = '';
  loadedScript = false;
  loadedStyle = false;
  loadedFullExample = false;
  bodyScriptMessage = `<body><script src="assets/js/elvis.js"></script></body>`;

  constructor(private versionService: VersionService, private titleService: Title) {
    this.versionService
      .getCDNScriptFile()
      .pipe(takeUntilDestroyed())
      .subscribe((tag) => {
        this.scriptTagCode = tag;
        this.createFullExample();
      });
    this.versionService
      .getCDNStyleFile()
      .pipe(takeUntilDestroyed())
      .subscribe((tag) => {
        this.linkTagCode = tag;
        this.createFullExample();
      });
    this.titleService.setTitle('Get started | Elvia design system');
  }

  private createFullExample(): void {
    if (this.linkTagCode !== '' && this.scriptTagCode !== '') {
      this.loadedScript = true;
      this.loadedStyle = true;
      this.loadedFullExample = true;
      this.fullExampleCode = `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    ${this.linkTagCode}
</head>
<body>
    ${this.scriptTagCode}
</body>
</html>`;
    }
  }
}
