import { Component } from '@angular/core';

import * as template from './input-size-small-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-input-size-small-ceg',
  templateUrl: './input-size-small-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputSizeSmallCegComponent }],
})
export class InputSizeSmallCegComponent implements StaticComponentExample {
  html = template.default;
}
