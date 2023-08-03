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

  handleValueOnChange(newValues: string | string[]): void {
    console.log('Autocomplete valueOnChange:', newValues);
  }

  handleOnItemSelect(newValues: string | string[]): void {
    console.log('Autocomplete selected item:', newValues);
  }
}
