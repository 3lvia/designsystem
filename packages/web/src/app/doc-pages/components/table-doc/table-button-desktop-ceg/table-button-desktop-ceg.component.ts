import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-button-desktop-ceg.component.html';

@Component({
  selector: 'app-table-button-desktop-ceg',
  templateUrl: './table-button-desktop-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableButtonDesktopCegComponent }],
})
export class TableButtonDesktopCegComponent implements StaticComponentExample {
  html = template.default;
}
