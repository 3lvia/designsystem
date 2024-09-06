import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './button-type-primary-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-button-type-primary-ceg',
  templateUrl: './button-type-primary-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ButtonTypePrimaryCegComponent }],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ButtonTypePrimaryCegComponent implements StaticComponentExample {
  html = template.default;
}
