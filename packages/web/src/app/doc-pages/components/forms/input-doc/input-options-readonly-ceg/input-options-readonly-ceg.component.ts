import { Component } from '@angular/core';

import * as template from './input-options-readonly-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-input-options-readonly-ceg',
  templateUrl: './input-options-readonly-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputOptionsReadonlyCegComponent }],
  standalone: true,
})
export class InputOptionsReadonlyCegComponent implements StaticComponentExample {
  html = template.default;
}
