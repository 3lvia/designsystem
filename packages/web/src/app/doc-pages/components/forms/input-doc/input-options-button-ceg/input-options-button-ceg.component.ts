import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './input-options-button-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-input-options-button-ceg',
  templateUrl: './input-options-button-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputOptionsButtonCegComponent }],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InputOptionsButtonCegComponent implements StaticComponentExample {
  html = template.default;
}
