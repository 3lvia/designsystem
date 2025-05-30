import { Component } from '@angular/core';

import * as template from './input-options-optional-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-input-options-optional-ceg',
  templateUrl: './input-options-optional-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputOptionsOptionalCegComponent }],
})
export class InputOptionsOptionalCegComponent implements StaticComponentExample {
  html = template.default;
}
