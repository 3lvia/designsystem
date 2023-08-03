import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-select-desktop-ceg.component.html';

@Component({
  selector: 'app-table-select-desktop-ceg',
  templateUrl: './table-select-desktop-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableSelectDesktopCegComponent }],
})
export class TableSelectDesktopCegComponent implements StaticComponentExample {
  html = template.default;

  navigateTo(url: string): void {
    // eslint-disable-next-line no-console
    console.log('Implement logic to navigate to', url);
  }
}
