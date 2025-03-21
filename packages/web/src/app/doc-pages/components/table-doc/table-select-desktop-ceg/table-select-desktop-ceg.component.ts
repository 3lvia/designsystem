import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './table-select-desktop-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-select-desktop-ceg',
  templateUrl: './table-select-desktop-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableSelectDesktopCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TableSelectDesktopCegComponent implements StaticComponentExample {
  html = template.default;

  navigateTo(url: string): void {
    console.log('Implement logic to navigate to', url);
  }
}
