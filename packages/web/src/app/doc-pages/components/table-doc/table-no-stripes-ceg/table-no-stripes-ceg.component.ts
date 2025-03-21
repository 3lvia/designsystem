import { Component } from '@angular/core';

import * as template from './table-no-stripes-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-no-stripes-ceg',
  templateUrl: './table-no-stripes-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableNoStripesCegComponent }],
})
export class TableNoStripesCegComponent implements StaticComponentExample {
  html = template.default;
}
