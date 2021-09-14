import { Component, OnInit } from '@angular/core';
import { VersionService } from 'src/app/core/services/version.service';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started-doc.component.html',
  styleUrls: ['./get-started-doc.component.scss']
})
export class GetStartedDocComponent implements OnInit {

  linkTagCode = '';
  scriptTagCode = '';
  fullExampleCode = '';
  loadedScript = false;
  loadedStyle = false;
  loadedFullExample = false;
  cssVarsCode = `/* main.js/ts - file */

import cssVars from 'css-vars-ponyfill';

cssVars({
  include: 'style',
  onlyLegacy: true,
  watch: true,
});`;

  bodyScriptMessage = `<body><script src="assets/js/elvis.js"></script></body>`;

  constructor(private versionService: VersionService) { }

  ngOnInit(): void {
    this.updateCodeExamples();
  }

  toggleAccordion(id: string): void {
    const element = document.getElementById(id) as HTMLElement;
    if (element) {
      if (element.classList.contains('e-accordion__item--open')) {
        element.classList.remove('e-accordion__item--open');
      } else {
        element.classList.add('e-accordion__item--open');
      }
    }
  }

  updateCodeExamples(): void {
    this.versionService.getCDNScriptFile().subscribe((tag: string) => {
      this.scriptTagCode = tag;
      this.createFullExample();
    });
    this.versionService.getCDNStyleFile().subscribe((tag: string) => {
      this.linkTagCode = tag;
      this.createFullExample();
    });
  }

  createFullExample(): void {
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
