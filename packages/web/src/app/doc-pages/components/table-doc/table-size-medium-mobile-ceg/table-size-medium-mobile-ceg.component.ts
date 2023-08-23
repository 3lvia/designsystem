import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-size-medium-mobile-ceg.component.html';

@Component({
  selector: 'app-table-size-medium-mobile-ceg',
  templateUrl: './table-size-medium-mobile-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableSizeMediumMobileCegComponent }],
})
export class TableSizeMediumMobileCegComponent implements StaticComponentExample {
  html = template.default;
}
