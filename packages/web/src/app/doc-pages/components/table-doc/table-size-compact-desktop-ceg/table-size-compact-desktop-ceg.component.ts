import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-size-compact-desktop-ceg.component.html';

@Component({
  selector: 'app-table-size-compact-desktop-ceg',
  templateUrl: './table-size-compact-desktop-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableSizeCompactDesktopCegComponent }],
})
export class TableSizeCompactDesktopCegComponent implements StaticComponentExample {
  html = template.default;
}
