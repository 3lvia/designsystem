import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./input-options-full-width-ceg.component.html';

@Component({
  selector: 'app-input-options-full-width-ceg',
  templateUrl: './input-options-full-width-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputOptionsFullWidthCegComponent }],
})
export class InputOptionsFullWidthCegComponent implements StaticComponentExample {
  html = template.default;
}
