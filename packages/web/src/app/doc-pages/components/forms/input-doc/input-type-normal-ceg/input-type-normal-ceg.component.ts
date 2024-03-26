import { Component } from '@angular/core';

import * as template from './input-type-normal-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-input-type-normal-ceg',
  templateUrl: './input-type-normal-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputTypeNormalCegComponent }],
  standalone: true,
})
export class InputTypeNormalCegComponent implements StaticComponentExample {
  html = template.default;
}
