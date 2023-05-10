import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./input-options-nolabel-ceg.component.html';

@Component({
  selector: 'app-input-options-nolabel-ceg',
  templateUrl: './input-options-nolabel-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputOptionsNolabelCegComponent }],
})
export class InputOptionsNolabelCegComponent implements StaticComponentExample {
  html = template.default;
}
