import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-numbers-ceg.component.html';

@Component({
  selector: 'app-table-numbers-ceg',
  templateUrl: './table-numbers-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableNumbersCegComponent }],
})
export class TableNumbersCegComponent implements StaticComponentExample {
  html = template.default;
}
