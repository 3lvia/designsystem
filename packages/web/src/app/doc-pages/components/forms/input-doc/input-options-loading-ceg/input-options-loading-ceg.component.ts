import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./input-options-loading-ceg.component.html';

@Component({
  selector: 'app-input-options-loading-ceg',
  templateUrl: './input-options-loading-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputOptionsLoadingCegComponent }],
})
export class InputOptionsLoadingCegComponent implements StaticComponentExample {
  html = template.default;
}
