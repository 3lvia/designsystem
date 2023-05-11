import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-size-normal-mobile-ceg.component.html';

@Component({
  selector: 'app-table-size-normal-mobile-ceg',
  templateUrl: './table-size-normal-mobile-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableSizeNormalMobileCegComponent }],
})
export class TableSizeNormalMobileCegComponent implements StaticComponentExample {
  html = template.default;
}
