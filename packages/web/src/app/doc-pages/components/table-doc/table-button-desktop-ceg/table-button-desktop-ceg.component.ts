import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './table-button-desktop-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-button-desktop-ceg',
  templateUrl: './table-button-desktop-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableButtonDesktopCegComponent }],
  changeDetection: ChangeDetectionStrategy.Eager,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TableButtonDesktopCegComponent implements StaticComponentExample {
  html = template.default;
}
