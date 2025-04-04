import { Component } from '@angular/core';

import * as template from './table-alignment-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-alignment-ceg',
  templateUrl: './table-alignment-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableAlignmentCegComponent }],
})
export class TableAlignmentCegComponent implements StaticComponentExample {
  html = template.default;
}
