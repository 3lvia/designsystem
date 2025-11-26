import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './table-detailed-information-popover-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-table-detailed-information-popover-ceg',
  templateUrl: './table-detailed-information-popover-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableExtraInformationPopoverCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TableExtraInformationPopoverCegComponent implements StaticComponentExample {
  html = template.default;

  isOpen = false;

  setIsOpen(isOpen: boolean): void {
    this.isOpen = isOpen;
  }
}
