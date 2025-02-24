import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './alert-local-actions-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-alert-local-actions-ceg',
  templateUrl: './alert-local-actions-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AlertLocalActionsCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AlertLocalActionsCegComponent implements StaticComponentExample {
  html = template.default;
}
