import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./dropdown-icons-ceg.component.html';

@Component({
  selector: 'app-dropdown-icons-ceg',
  templateUrl: './dropdown-icons-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: DropdownIconsCegComponent }],
})
export class DropdownIconsCegComponent implements StaticComponentExample {
  html = template.default;

  handleOnChange(newValues: string | string[]): void {
    console.log('Selected dropdown items:', newValues);
  }
}
