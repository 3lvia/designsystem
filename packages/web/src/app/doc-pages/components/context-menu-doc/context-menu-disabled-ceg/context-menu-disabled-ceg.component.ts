import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './context-menu-disabled-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-context-menu-disabled-ceg',
  templateUrl: './context-menu-disabled-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ContextMenuDisabledCegComponent }],
  changeDetection: ChangeDetectionStrategy.Eager,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContextMenuDisabledCegComponent implements StaticComponentExample {
  html = template.default;
  isShowing = false;
}
