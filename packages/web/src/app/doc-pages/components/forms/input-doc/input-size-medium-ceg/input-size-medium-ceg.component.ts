import { Component } from '@angular/core';

import * as template from './input-size-medium-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-input-size-medium-ceg',
  templateUrl: './input-size-medium-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputSizeMediumCegComponent }],
})
export class InputSizeMediumCegComponent implements StaticComponentExample {
  html = template.default;
}
