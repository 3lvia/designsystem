import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./toggle-ceg.component.html';

@Component({
  selector: 'app-toggle-ceg',
  templateUrl: './toggle-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ToggleCegComponent }],
})
export class ToggleCegComponent implements StaticComponentExample {
  html = template.default;
}
