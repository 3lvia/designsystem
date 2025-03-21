import { Component } from '@angular/core';

import * as template from './table-long-column-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-long-column-ceg',
  templateUrl: './table-long-column-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableLongColumnCegComponent }],
})
export class TableLongColumnCegComponent implements StaticComponentExample {
  html = template.default;
}
