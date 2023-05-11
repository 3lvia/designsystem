import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-size-compact-mobile-ceg.component.html';

@Component({
  selector: 'app-table-size-compact-mobile-ceg',
  templateUrl: './table-size-compact-mobile-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableSizeCompactMobileCegComponent }],
})
export class TableSizeCompactMobileCegComponent implements StaticComponentExample {
  html = template.default;
}
