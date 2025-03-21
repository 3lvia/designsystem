import { Component } from '@angular/core';

import * as template from './table-input-mobile-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-input-mobile-ceg',
  templateUrl: './table-input-mobile-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableInputMobileCegComponent }],
})
export class TableInputMobileCegComponent implements StaticComponentExample {
  html = template.default;
}
