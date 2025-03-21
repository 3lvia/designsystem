import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './dropdown-tree-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-dropdown-tree-ceg',
  templateUrl: './dropdown-tree-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: DropdownTreeCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DropdownTreeCegComponent implements StaticComponentExample {
  html = template.default;

  handleOnChange(newValues: string | string[]): void {
    console.log('Selected dropdown items:', newValues);
  }
}
