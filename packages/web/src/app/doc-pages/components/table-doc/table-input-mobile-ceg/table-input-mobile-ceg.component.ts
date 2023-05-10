import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-input-mobile-ceg.component.html';

@Component({
  selector: 'app-table-input-mobile-ceg',
  templateUrl: './table-input-mobile-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableInputMobileCegComponent }],
})
export class TableInputMobileCegComponent implements StaticComponentExample {
  html = template.default;
}
