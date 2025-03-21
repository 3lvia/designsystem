import { Component } from '@angular/core';

import * as template from './table-sticky-row-header-desktop-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-sticky-row-header-desktop-ceg',
  templateUrl: './table-sticky-row-header-desktop-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableStickyRowHeaderDesktopCegComponent }],
})
export class TableStickyRowHeaderDesktopCegComponent implements StaticComponentExample {
  html = template.default;
}
