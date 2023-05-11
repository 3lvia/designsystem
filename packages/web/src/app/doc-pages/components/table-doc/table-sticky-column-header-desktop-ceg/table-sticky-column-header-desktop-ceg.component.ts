import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-sticky-column-header-desktop-ceg.component.html';

@Component({
  selector: 'app-table-sticky-column-header-desktop-ceg',
  templateUrl: './table-sticky-column-header-desktop-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableStickyColumnHeaderDesktopCegComponent }],
})
export class TableStickyColumnHeaderDesktopCegComponent implements StaticComponentExample {
  html = template.default;
}
