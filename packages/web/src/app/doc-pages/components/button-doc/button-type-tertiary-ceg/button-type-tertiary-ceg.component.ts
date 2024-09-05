import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './button-type-tertiary-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-button-type-tertiary-ceg',
  templateUrl: './button-type-tertiary-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ButtonTypeTertiaryCegComponent }],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ButtonTypeTertiaryCegComponent implements StaticComponentExample {
  html = template.default;
}
