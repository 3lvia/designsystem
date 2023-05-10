import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-alignment-ceg.component.html';

@Component({
  selector: 'app-table-alignment-ceg',
  templateUrl: './table-alignment-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableAlignmentCegComponent }],
})
export class TableAlignmentCegComponent implements StaticComponentExample {
  html = template.default;
}
