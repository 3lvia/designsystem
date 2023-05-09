import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./input-type-normal-ceg.component.html';

@Component({
  selector: 'app-input-type-normal-ceg',
  templateUrl: './input-type-normal-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputTypeNormalCegComponent }],
})
export class InputTypeNormalCegComponent implements StaticComponentExample {
  html = template.default;
}
