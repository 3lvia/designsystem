import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './context-menu-selectable-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
    selector: 'app-context-menu-selectable-ceg',
    templateUrl: './context-menu-selectable-ceg.component.html',
    providers: [{ provide: StaticComponentExample, useExisting: ContextMenuSelectableCegComponent }],
    imports: [NgClass],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContextMenuSelectableCegComponent implements StaticComponentExample {
  html = template.default;
  isShowing = false;
}
