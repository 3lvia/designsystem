import { Component } from '@angular/core';

import * as template from './table-sticky-column-header-desktop-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-sticky-column-header-desktop-ceg',
  templateUrl: './table-sticky-column-header-desktop-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableStickyColumnHeaderDesktopCegComponent }],
})
export class TableStickyColumnHeaderDesktopCegComponent implements StaticComponentExample {
  html = template.default;
}
