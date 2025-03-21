import { Component } from '@angular/core';

import * as template from './table-footnote-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-footnote-ceg',
  templateUrl: './table-footnote-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableFootnoteCegComponent }],
})
export class TableFootnoteCegComponent implements StaticComponentExample {
  html = template.default;
}
