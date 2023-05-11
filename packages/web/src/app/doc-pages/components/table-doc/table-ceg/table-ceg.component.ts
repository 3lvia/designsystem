import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-ceg.component.html';

@Component({
  selector: 'app-table-ceg',
  templateUrl: './table-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableCegComponent }],
})
export class TableCegComponent implements StaticComponentExample {
  html = template.default;
}
