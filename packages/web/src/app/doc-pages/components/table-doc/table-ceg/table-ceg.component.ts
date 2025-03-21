import { Component } from '@angular/core';

import * as template from './table-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-ceg',
  templateUrl: './table-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableCegComponent }],
})
export class TableCegComponent implements StaticComponentExample {
  html = template.default;
}
