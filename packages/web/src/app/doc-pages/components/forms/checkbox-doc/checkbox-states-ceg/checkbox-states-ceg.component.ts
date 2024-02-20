import { Component } from '@angular/core';

import * as template from 'html-loader!./checkbox-states-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-checkbox-states-ceg',
  templateUrl: './checkbox-states-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: CheckboxStatesCegComponent }],
  standalone: true,
})
export class CheckboxStatesCegComponent implements StaticComponentExample {
  html = template.default;
}
