import { Component } from '@angular/core';

import * as template from './toggle-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-toggle-ceg',
  templateUrl: './toggle-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ToggleCegComponent }],
})
export class ToggleCegComponent implements StaticComponentExample {
  html = template.default;
}
