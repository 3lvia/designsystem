import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './table-validation-row-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-validation-row-ceg',
  templateUrl: './table-validation-row-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableValidationRowCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TableValidationRowCegComponent implements StaticComponentExample {
  html = template.default;
}
