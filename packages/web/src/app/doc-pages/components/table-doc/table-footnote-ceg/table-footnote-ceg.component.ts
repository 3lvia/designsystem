import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-footnote-ceg.component.html';

@Component({
  selector: 'app-table-footnote-ceg',
  templateUrl: './table-footnote-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableFootnoteCegComponent }],
})
export class TableFootnoteCegComponent implements StaticComponentExample {
  html = template.default;
}
