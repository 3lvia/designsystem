import { Component } from '@angular/core';

import * as template from './table-select-mobile-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-select-mobile-ceg',
  templateUrl: './table-select-mobile-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableSelectMobileCegComponent }],
  standalone: true,
})
export class TableSelectMobileCegComponent implements StaticComponentExample {
  html = template.default;

  navigateTo(url: string): void {
    console.log('Implement logic to navigate to', url);
  }
}
