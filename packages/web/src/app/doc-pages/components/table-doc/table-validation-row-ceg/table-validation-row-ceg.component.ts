import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-validation-row-ceg.component.html';

@Component({
  selector: 'app-table-validation-row-ceg',
  templateUrl: './table-validation-row-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableValidationRowCegComponent }],
})
export class TableValidationRowCegComponent implements StaticComponentExample {
  html = template.default;
}
