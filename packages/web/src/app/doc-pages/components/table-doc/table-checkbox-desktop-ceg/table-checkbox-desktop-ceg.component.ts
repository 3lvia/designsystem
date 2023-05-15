import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-checkbox-desktop-ceg.component.html';

@Component({
  selector: 'app-table-checkbox-desktop-ceg',
  templateUrl: './table-checkbox-desktop-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableCheckboxDesktopCegComponent }],
})
export class TableCheckboxDesktopCegComponent implements StaticComponentExample {
  html = template.default;
}
