import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./table-detailed-information-popover-ceg.component.html';

@Component({
  selector: 'app-table-detailed-information-popover-ceg',
  templateUrl: './table-detailed-information-popover-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TableExtraInformationPopoverCegComponent }],
})
export class TableExtraInformationPopoverCegComponent implements StaticComponentExample {
  html = template.default;

  isOpen = false;

  setIsOpen(isOpen: boolean): void {
    this.isOpen = isOpen;
  }
}
