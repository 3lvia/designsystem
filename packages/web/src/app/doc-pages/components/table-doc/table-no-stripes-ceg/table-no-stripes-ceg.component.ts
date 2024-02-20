import { Component } from '@angular/core';

import * as template from 'html-loader!./table-no-stripes-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-no-stripes-ceg',
  templateUrl: './table-no-stripes-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableNoStripesCegComponent }],
  standalone: true,
})
export class TableNoStripesCegComponent implements StaticComponentExample {
  html = template.default;
}
