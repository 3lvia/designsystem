import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./dropdown-status-ceg.component.html';

@Component({
  selector: 'app-dropdown-status-ceg',
  templateUrl: './dropdown-status-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: DropdownStatusCegComponent }],
})
export class DropdownStatusCegComponent implements StaticComponentExample {
  html = template.default;

  handleOnChange(newValues: string | string[]): void {
    // eslint-disable-next-line no-console
    console.log('Selected dropdown items:', newValues);
  }
}
