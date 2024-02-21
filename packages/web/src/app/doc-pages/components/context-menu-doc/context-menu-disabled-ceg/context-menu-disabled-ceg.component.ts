import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from 'html-loader!./context-menu-disabled-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-context-menu-disabled-ceg',
  templateUrl: './context-menu-disabled-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ContextMenuDisabledCegComponent }],
  standalone: true,
  imports: [NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContextMenuDisabledCegComponent implements StaticComponentExample {
  html = template.default;
  isShowing = false;
}
