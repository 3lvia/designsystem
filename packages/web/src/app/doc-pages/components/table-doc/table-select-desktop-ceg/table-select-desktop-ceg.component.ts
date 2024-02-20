import { Component } from '@angular/core';

import * as template from 'html-loader!./table-select-desktop-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-select-desktop-ceg',
  templateUrl: './table-select-desktop-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableSelectDesktopCegComponent }],
  standalone: true,
})
export class TableSelectDesktopCegComponent implements StaticComponentExample {
  html = template.default;

  navigateTo(url: string): void {
    console.log('Implement logic to navigate to', url);
  }
}
