import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './autocomplete-label-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-autocomplete-label-ceg',
  templateUrl: './autocomplete-label-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AutocompleteLabelCegComponent }],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AutocompleteLabelCegComponent implements StaticComponentExample {
  html = template.default;

  handleValueOnChange(value: string): void {
    console.log('Autocomplete valueOnChange:', value);
  }

  handleOnSelectItem(value: string): void {
    console.log('Autocomplete selected item:', value);
  }
}
