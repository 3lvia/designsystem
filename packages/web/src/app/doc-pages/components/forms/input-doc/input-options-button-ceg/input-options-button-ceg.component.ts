import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./input-options-button-ceg.component.html';

@Component({
  selector: 'app-input-options-button-ceg',
  templateUrl: './input-options-button-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputOptionsButtonCegComponent }],
})
export class InputOptionsButtonCegComponent implements StaticComponentExample {
  html = template.default;
}
