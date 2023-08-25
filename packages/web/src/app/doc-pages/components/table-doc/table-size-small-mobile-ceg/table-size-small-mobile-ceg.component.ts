import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-size-small-mobile-ceg.component.html';

@Component({
  selector: 'app-table-size-small-mobile-ceg',
  templateUrl: './table-size-small-mobile-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableSizeSmallMobileCegComponent }],
})
export class TableSizeSmallMobileCegComponent implements StaticComponentExample {
  html = template.default;
}
