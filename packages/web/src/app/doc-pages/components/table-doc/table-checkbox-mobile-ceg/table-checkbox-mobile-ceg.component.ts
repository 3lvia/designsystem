import { Component } from '@angular/core';

import * as template from './table-checkbox-mobile-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-checkbox-mobile-ceg',
  templateUrl: './table-checkbox-mobile-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableCheckboxMobileCegComponent }],
})
export class TableCheckboxMobileCegComponent implements StaticComponentExample {
  html = template.default;
}
