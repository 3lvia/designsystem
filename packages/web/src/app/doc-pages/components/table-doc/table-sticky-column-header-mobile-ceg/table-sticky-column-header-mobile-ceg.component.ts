import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-sticky-column-header-mobile-ceg.component.html';

@Component({
  selector: 'app-table-sticky-column-header-mobile-ceg',
  templateUrl: './table-sticky-column-header-mobile-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableStickyColumnHeaderMobileCegComponent }],
})
export class TableStickyColumnHeaderMobileCegComponent implements StaticComponentExample {
  html = template.default;
}
