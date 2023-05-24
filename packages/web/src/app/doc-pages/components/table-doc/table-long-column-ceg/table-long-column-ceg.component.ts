import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-long-column-ceg.component.html';

@Component({
  selector: 'app-table-long-column-ceg',
  templateUrl: './table-long-column-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableLongColumnCegComponent }],
})
export class TableLongColumnCegComponent implements StaticComponentExample {
  html = template.default;
}
