import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./dropdown-empty-ceg.component.html';

@Component({
  selector: 'app-dropdown-empty-ceg',
  templateUrl: './dropdown-empty-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: DropdownEmptyCegComponent }],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DropdownEmptyCegComponent implements StaticComponentExample {
  html = template.default;

  handleOnChange(newValues: string | string[]): void {
    console.log('Selected dropdown items:', newValues);
  }
}
