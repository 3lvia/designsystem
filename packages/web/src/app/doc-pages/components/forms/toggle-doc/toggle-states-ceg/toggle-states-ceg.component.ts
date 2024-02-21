import { Component } from '@angular/core';

import * as template from 'html-loader!./toggle-states-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-toggle-states-ceg',
  templateUrl: './toggle-states-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ToggleStatesCegComponent }],
  standalone: true,
})
export class ToggleStatesCegComponent implements StaticComponentExample {
  html = template.default;
}
