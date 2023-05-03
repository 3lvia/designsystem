import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./context-menu-disabled-ceg.component.html';

@Component({
  selector: 'app-context-menu-disabled-ceg',
  templateUrl: './context-menu-disabled-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ContextMenuDisabledCegComponent }],
})
export class ContextMenuDisabledCegComponent implements StaticComponentExample {
  html = template.default;
  isShowing = false;
}
