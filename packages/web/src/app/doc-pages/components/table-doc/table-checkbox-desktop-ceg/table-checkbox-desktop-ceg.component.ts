import { Component } from '@angular/core';

import * as template from './table-checkbox-desktop-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-checkbox-desktop-ceg',
  templateUrl: './table-checkbox-desktop-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableCheckboxDesktopCegComponent }],
})
export class TableCheckboxDesktopCegComponent implements StaticComponentExample {
  html = template.default;
}
