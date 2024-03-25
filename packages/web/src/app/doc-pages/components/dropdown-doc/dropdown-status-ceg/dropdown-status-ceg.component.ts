import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './dropdown-status-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-dropdown-status-ceg',
  templateUrl: './dropdown-status-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: DropdownStatusCegComponent }],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DropdownStatusCegComponent implements StaticComponentExample {
  html = template.default;

  handleOnChange(newValues: string | string[]): void {
    console.log('Selected dropdown items:', newValues);
  }
}
