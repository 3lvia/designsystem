import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-size-normal-desktop-ceg.component.html';

@Component({
  selector: 'app-table-size-normal-desktop-ceg',
  templateUrl: './table-size-normal-desktop-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableSizeNormalDesktopCegComponent }],
})
export class TableSizeNormalDesktopCegComponent implements StaticComponentExample {
  html = template.default;
}
