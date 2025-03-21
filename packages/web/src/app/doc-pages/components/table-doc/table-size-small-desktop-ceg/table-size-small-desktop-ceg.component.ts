import { Component } from '@angular/core';

import * as template from './table-size-small-desktop-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-size-small-desktop-ceg',
  templateUrl: './table-size-small-desktop-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableSizeSmallDesktopCegComponent }],
})
export class TableSizeSmallDesktopCegComponent implements StaticComponentExample {
  html = template.default;
}
