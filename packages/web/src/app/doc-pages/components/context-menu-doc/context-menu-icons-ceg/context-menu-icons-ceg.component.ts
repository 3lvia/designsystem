import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './context-menu-icons-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-context-menu-icons-ceg',
  templateUrl: './context-menu-icons-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ContextMenuIconsCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContextMenuIconsCegComponent implements StaticComponentExample {
  html = template.default;
  isShowing = false;
}
