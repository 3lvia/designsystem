import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./input-options-readonly-ceg.component.html';

@Component({
  selector: 'app-input-options-readonly-ceg',
  templateUrl: './input-options-readonly-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputOptionsReadonlyCegComponent }],
})
export class InputOptionsReadonlyCegComponent implements StaticComponentExample {
  html = template.default;
}
