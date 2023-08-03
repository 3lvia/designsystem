import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./autocomplete-label-ceg.component.html';

@Component({
  selector: 'app-autocomplete-label-ceg',
  templateUrl: './autocomplete-label-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AutocompleteLabelCegComponent }],
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
