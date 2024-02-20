import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-checkbox-mobile-ceg.component.html';

@Component({
  selector: 'app-table-checkbox-mobile-ceg',
  templateUrl: './table-checkbox-mobile-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableCheckboxMobileCegComponent }],
  standalone: true,
})
export class TableCheckboxMobileCegComponent implements StaticComponentExample {
  html = template.default;
}
