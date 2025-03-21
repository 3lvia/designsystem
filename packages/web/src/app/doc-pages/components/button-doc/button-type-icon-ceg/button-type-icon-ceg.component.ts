import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './button-type-icon-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-button-type-icon-ceg',
  templateUrl: './button-type-icon-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ButtonTypeIconCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ButtonTypeIconCegComponent implements StaticComponentExample {
  html = template.default;
}
