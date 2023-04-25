import { Component, OnInit } from '@angular/core';
import { VersionService } from 'src/app/core/services/version.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started-doc.component.html',
  styleUrls: ['./get-started-doc.component.scss'],
})
export class GetStartedDocComponent implements OnInit {
  linkTagCode = '';
  scriptTagCode = '';
  fullExampleCode = '';
  loadedScript = false;
  loadedStyle = false;
  loadedFullExample = false;
  bodyScriptMessage = `<body><script src="assets/js/elvis.js"></script></body>`;

  constructor(private versionService: VersionService, private titleService: Title) {}

  ngOnInit(): void {
    this.updateCodeExamples();
    this.titleService.setTitle('Get started | Elvia design system');
  }

  toggleAccordion(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      if (element.classList.contains('e-accordion__item--open')) {
        element.classList.remove('e-accordion__item--open');
      } else {
        element.classList.add('e-accordion__item--open');
      }
    }
  }

  updateCodeExamples(): void {
    this.versionService.getCDNScriptFile().subscribe((tag) => {
      this.scriptTagCode = tag;
      this.createFullExample();
    });
    this.versionService.getCDNStyleFile().subscribe((tag) => {
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
