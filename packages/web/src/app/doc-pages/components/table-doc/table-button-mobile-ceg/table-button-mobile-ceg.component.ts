import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './table-button-mobile-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-button-mobile-ceg',
  templateUrl: './table-button-mobile-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableButtonMobileCegComponent }],
  changeDetection: ChangeDetectionStrategy.Eager,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TableButtonMobileCegComponent implements StaticComponentExample {
  html = template.default;
}
