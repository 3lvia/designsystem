import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './button-type-secondary-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-button-type-secondary-ceg',
  templateUrl: './button-type-secondary-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ButtonTypeSecondaryCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ButtonTypeSecondaryCegComponent implements StaticComponentExample {
  html = template.default;
}
