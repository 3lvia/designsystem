import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./input-size-medium-ceg.component.html';

@Component({
  selector: 'app-input-size-medium-ceg',
  templateUrl: './input-size-medium-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputSizeMediumCegComponent }],
})
export class InputSizeMediumCegComponent implements StaticComponentExample {
  html = template.default;
}
