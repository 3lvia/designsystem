import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-input-desktop-ceg.component.html';

@Component({
  selector: 'app-table-input-desktop-ceg',
  templateUrl: './table-input-desktop-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableInputDesktopCegComponent }],
})
export class TableInputDesktopCegComponent implements StaticComponentExample {
  html = template.default;
}
