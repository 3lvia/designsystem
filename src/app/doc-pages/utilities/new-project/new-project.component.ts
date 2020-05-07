import { Component, OnInit } from '@angular/core';
import { getUtilities } from 'src/app/shared/e-items';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  componentStatus = getUtilities('new-project-doc').status;
  cssVarsCode = `/* main.js/ts - file */

import cssVars from 'css-vars-ponyfill';

cssVars({
  include: 'style',
  onlyLegacy: true,
  watch: true,
});`;

  constructor() { }

  ngOnInit() {
  }

}
