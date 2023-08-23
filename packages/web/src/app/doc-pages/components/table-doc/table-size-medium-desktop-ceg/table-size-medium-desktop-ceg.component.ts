import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-size-medium-desktop-ceg.component.html';

@Component({
  selector: 'app-table-size-medium-desktop-ceg',
  templateUrl: './table-size-medium-desktop-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableSizeMediumDesktopCegComponent }],
})
export class TableSizeMediumDesktopCegComponent implements StaticComponentExample {
  html = template.default;
}
