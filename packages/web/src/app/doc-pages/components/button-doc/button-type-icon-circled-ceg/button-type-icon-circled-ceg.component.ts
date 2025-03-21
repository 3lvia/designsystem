import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './button-type-icon-circled-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-button-type-icon-circled-ceg',
  templateUrl: './button-type-icon-circled-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ButtonTypeIconCircledCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ButtonTypeIconCircledCegComponent implements StaticComponentExample {
  html = template.default;
}
