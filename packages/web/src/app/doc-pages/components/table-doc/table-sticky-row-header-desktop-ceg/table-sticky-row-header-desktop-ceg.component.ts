import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-sticky-row-header-desktop-ceg.component.html';

@Component({
  selector: 'app-table-sticky-row-header-desktop-ceg',
  templateUrl: './table-sticky-row-header-desktop-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableStickyRowHeaderDesktopCegComponent }],
})
export class TableStickyRowHeaderDesktopCegComponent implements StaticComponentExample {
  html = template.default;
}
