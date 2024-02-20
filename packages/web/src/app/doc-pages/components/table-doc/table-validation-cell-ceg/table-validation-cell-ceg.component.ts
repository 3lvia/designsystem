import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from 'html-loader!./table-validation-cell-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-validation-cell-ceg',
  templateUrl: './table-validation-cell-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableValidationCellCegComponent }],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TableValidationCellCegComponent implements StaticComponentExample {
  html = template.default;
}
