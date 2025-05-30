import { Component } from '@angular/core';

import * as template from './input-options-full-width-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-input-options-full-width-ceg',
  templateUrl: './input-options-full-width-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputOptionsFullWidthCegComponent }],
})
export class InputOptionsFullWidthCegComponent implements StaticComponentExample {
  html = template.default;
}
