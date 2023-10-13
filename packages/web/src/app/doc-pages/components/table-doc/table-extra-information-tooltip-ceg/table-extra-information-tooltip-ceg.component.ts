import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-extra-information-tooltip-ceg.component.html';

@Component({
  selector: 'app-table-extra-information-tooltip-ceg',
  templateUrl: './table-extra-information-tooltip-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableExtraInformationTooltipCegComponent }],
})
export class TableExtraInformationTooltipCegComponent implements StaticComponentExample {
  html = template.default;

  showHoverIcon = false;
}
