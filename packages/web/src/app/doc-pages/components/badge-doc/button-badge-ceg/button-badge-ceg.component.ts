import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './button-badge-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-button-badge-ceg',
  templateUrl: './button-badge-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ButtonBadgeCegComponent }],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ButtonBadgeCegComponent implements StaticComponentExample {
  html = template.default;
}
