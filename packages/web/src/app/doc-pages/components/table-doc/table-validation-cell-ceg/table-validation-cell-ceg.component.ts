import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-validation-cell-ceg.component.html';

@Component({
  selector: 'app-table-validation-cell-ceg',
  templateUrl: './table-validation-cell-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableValidationCellCegComponent }],
})
export class TableValidationCellCegComponent implements StaticComponentExample {
  html = template.default;
}
