import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './table-detailed-information-tooltip-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-detailed-information-tooltip-ceg',
  templateUrl: './table-detailed-information-tooltip-ceg.component.html',
  styleUrls: ['./table-detailed-information-tooltip-ceg.component.scss'],
  providers: [{ provide: StaticComponentExample, useExisting: TableExtraInformationTooltipCegComponent }],
  changeDetection: ChangeDetectionStrategy.Eager,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TableExtraInformationTooltipCegComponent implements StaticComponentExample {
  html = template.default;

  showHoverIcon = false;
}
