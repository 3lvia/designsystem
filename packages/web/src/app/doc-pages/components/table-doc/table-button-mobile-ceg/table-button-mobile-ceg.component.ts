import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-button-mobile-ceg.component.html';

@Component({
  selector: 'app-table-button-mobile-ceg',
  templateUrl: './table-button-mobile-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableButtonMobileCegComponent }],
})
export class TableButtonMobileCegComponent implements StaticComponentExample {
  html = template.default;
}
