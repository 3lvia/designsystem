import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-size-small-desktop-ceg.component.html';

@Component({
  selector: 'app-table-size-small-desktop-ceg',
  templateUrl: './table-size-small-desktop-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableSizeSmallDesktopCegComponent }],
})
export class TableSizeSmallDesktopCegComponent implements StaticComponentExample {
  html = template.default;
}
