import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-no-stripes-ceg.component.html';

@Component({
  selector: 'app-table-no-stripes-ceg',
  templateUrl: './table-no-stripes-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableNoStripesCegComponent }],
})
export class TableNoStripesCegComponent implements StaticComponentExample {
  html = template.default;
}
