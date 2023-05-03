import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./context-menu-headings-ceg.component.html';

@Component({
  selector: 'app-context-menu-headings-ceg',
  templateUrl: './context-menu-headings-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ContextMenuHeadingsCegComponent }],
})
export class ContextMenuHeadingsCegComponent implements StaticComponentExample {
  html = template.default;
  isShowing = false;
}
