import { Component, OnInit } from '@angular/core';
import { VersionService } from 'src/app/core/services/version.service';


@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
})
export class NewProjectComponent implements OnInit {
  linkTagCode = '';
  scriptTagCode = '';
  fullExampleCode = '';
  cssVarsCode = `/* main.js/ts - file */

import cssVars from 'css-vars-ponyfill';

cssVars({
  include: 'style',
  onlyLegacy: true,
  watch: true,
});`;


  constructor(private versionService: VersionService) {

  }

  ngOnInit(): void {
    this.updateCodeExamples();
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
      this.fullExampleCode = `
<!doctype html>
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
