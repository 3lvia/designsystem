import { Component } from '@angular/core';

import * as template from './table-size-medium-mobile-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-size-medium-mobile-ceg',
  templateUrl: './table-size-medium-mobile-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableSizeMediumMobileCegComponent }],
})
export class TableSizeMediumMobileCegComponent implements StaticComponentExample {
  html = template.default;
}
