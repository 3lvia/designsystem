import { Component } from '@angular/core';

import * as template from './table-size-small-mobile-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-size-small-mobile-ceg',
  templateUrl: './table-size-small-mobile-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableSizeSmallMobileCegComponent }],
})
export class TableSizeSmallMobileCegComponent implements StaticComponentExample {
  html = template.default;
}
