import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./dropdown-tree-ceg.component.html';

@Component({
  selector: 'app-dropdown-tree-ceg',
  templateUrl: './dropdown-tree-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: DropdownTreeCegComponent }],
})
export class DropdownTreeCegComponent implements StaticComponentExample {
  html = template.default;

  handleOnChange(newValues: string | string[]): void {
    // eslint-disable-next-line no-console
    console.log('Selected dropdown items:', newValues);
  }
}
