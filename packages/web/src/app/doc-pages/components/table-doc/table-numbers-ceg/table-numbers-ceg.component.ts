import { Component } from '@angular/core';

import * as template from './table-numbers-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-numbers-ceg',
  templateUrl: './table-numbers-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableNumbersCegComponent }],
})
export class TableNumbersCegComponent implements StaticComponentExample {
  html = template.default;
}
