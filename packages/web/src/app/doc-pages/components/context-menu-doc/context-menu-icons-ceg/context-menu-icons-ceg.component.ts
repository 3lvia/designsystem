import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./context-menu-icons-ceg.component.html';

@Component({
  selector: 'app-context-menu-icons-ceg',
  templateUrl: './context-menu-icons-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ContextMenuIconsCegComponent }],
})
export class ContextMenuIconsCegComponent implements StaticComponentExample {
  html = template.default;
  isShowing = false;
}
