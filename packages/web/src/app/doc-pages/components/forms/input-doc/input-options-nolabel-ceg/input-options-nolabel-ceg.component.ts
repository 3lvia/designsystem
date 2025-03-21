import { Component } from '@angular/core';

import * as template from './input-options-nolabel-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-input-options-nolabel-ceg',
  templateUrl: './input-options-nolabel-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputOptionsNolabelCegComponent }],
})
export class InputOptionsNolabelCegComponent implements StaticComponentExample {
  html = template.default;
}
