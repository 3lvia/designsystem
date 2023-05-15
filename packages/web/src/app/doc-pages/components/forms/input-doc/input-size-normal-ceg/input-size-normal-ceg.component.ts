import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./input-size-normal-ceg.component.html';

@Component({
  selector: 'app-input-size-normal-ceg',
  templateUrl: './input-size-normal-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputSizeNormalCegComponent }],
})
export class InputSizeNormalCegComponent implements StaticComponentExample {
  html = template.default;
}
