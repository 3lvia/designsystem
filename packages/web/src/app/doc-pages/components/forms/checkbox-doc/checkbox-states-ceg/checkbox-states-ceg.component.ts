import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./checkbox-states-ceg.component.html';

@Component({
  selector: 'app-checkbox-states-ceg',
  templateUrl: './checkbox-states-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: CheckboxStatesCegComponent }],
})
export class CheckboxStatesCegComponent implements StaticComponentExample {
  html = template.default;
}
