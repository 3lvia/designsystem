import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./input-size-small-ceg.component.html';

@Component({
  selector: 'app-input-size-small-ceg',
  templateUrl: './input-size-small-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputSizeSmallCegComponent }],
})
export class InputSizeSmallCegComponent implements StaticComponentExample {
  html = template.default;
}
