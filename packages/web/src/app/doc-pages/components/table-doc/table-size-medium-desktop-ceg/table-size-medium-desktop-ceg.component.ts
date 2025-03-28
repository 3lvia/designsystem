import { Component } from '@angular/core';

import * as template from './table-size-medium-desktop-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-size-medium-desktop-ceg',
  templateUrl: './table-size-medium-desktop-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableSizeMediumDesktopCegComponent }],
})
export class TableSizeMediumDesktopCegComponent implements StaticComponentExample {
  html = template.default;
}
