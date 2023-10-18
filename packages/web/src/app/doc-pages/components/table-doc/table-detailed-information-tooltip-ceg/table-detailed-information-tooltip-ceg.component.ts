import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-detailed-information-tooltip-ceg.component.html';

@Component({
  selector: 'app-table-detailed-information-tooltip-ceg',
  templateUrl: './table-detailed-information-tooltip-ceg.component.html',
  styleUrls: ['./table-detailed-information-tooltip-ceg.component.scss'],
  providers: [{ provide: StaticComponentExample, useExisting: TableExtraInformationTooltipCegComponent }],
})
export class TableExtraInformationTooltipCegComponent implements StaticComponentExample {
  html = template.default;

  showHoverIcon = false;
}
