import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./toggle-states-ceg.component.html';

@Component({
  selector: 'app-toggle-states-ceg',
  templateUrl: './toggle-states-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ToggleStatesCegComponent }],
})
export class ToggleStatesCegComponent implements StaticComponentExample {
  html = template.default;
}
