import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./input-options-optional-ceg.component.html';

@Component({
  selector: 'app-input-options-optional-ceg',
  templateUrl: './input-options-optional-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputOptionsOptionalCegComponent }],
})
export class InputOptionsOptionalCegComponent implements StaticComponentExample {
  html = template.default;
}
