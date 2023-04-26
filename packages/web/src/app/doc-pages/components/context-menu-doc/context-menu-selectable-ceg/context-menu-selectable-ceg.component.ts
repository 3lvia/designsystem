import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./context-menu-selectable-ceg.component.html';

@Component({
  selector: 'app-context-menu-selectable-ceg',
  templateUrl: './context-menu-selectable-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ContextMenuSelectableCegComponent }],
})
export class ContextMenuSelectableCegComponent implements StaticComponentExample {
  html = template.default;
  isShowing = false;
}
