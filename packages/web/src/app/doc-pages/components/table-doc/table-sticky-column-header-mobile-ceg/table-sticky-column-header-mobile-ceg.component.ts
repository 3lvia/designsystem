import { Component } from '@angular/core';

import * as template from './table-sticky-column-header-mobile-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-sticky-column-header-mobile-ceg',
  templateUrl: './table-sticky-column-header-mobile-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableStickyColumnHeaderMobileCegComponent }],
  standalone: true,
})
export class TableStickyColumnHeaderMobileCegComponent implements StaticComponentExample {
  html = template.default;
}
