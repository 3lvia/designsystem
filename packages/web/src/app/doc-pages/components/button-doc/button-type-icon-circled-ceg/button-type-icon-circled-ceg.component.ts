import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./button-type-icon-circled-ceg.component.html';

@Component({
  selector: 'app-button-type-icon-circled-ceg',
  templateUrl: './button-type-icon-circled-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ButtonTypeIconCircledCegComponent }],
})
export class ButtonTypeIconCircledCegComponent implements StaticComponentExample {
  html = template.default;
}
