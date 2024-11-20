import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './context-menu-headings-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-context-menu-headings-ceg',
  templateUrl: './context-menu-headings-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ContextMenuHeadingsCegComponent }],
  imports: [NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContextMenuHeadingsCegComponent implements StaticComponentExample {
  html = template.default;
  isShowing = false;
}
