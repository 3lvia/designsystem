import { Component } from '@angular/core';

import * as template from './table-input-desktop-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-input-desktop-ceg',
  templateUrl: './table-input-desktop-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableInputDesktopCegComponent }],
})
export class TableInputDesktopCegComponent implements StaticComponentExample {
  html = template.default;
}
