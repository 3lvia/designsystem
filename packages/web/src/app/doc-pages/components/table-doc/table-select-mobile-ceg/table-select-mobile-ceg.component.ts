import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-select-mobile-ceg.component.html';

@Component({
  selector: 'app-table-select-mobile-ceg',
  templateUrl: './table-select-mobile-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableSelectMobileCegComponent }],
})
export class TableSelectMobileCegComponent implements StaticComponentExample {
  html = template.default;

  navigateTo(url: string): void {
    // eslint-disable-next-line no-console
    console.log('Implement logic to navigate to', url);
  }
}
