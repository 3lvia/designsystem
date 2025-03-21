import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './alert-global-actions-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-alert-global-actions-ceg',
  templateUrl: './alert-global-actions-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AlertGlobalActionsCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AlertGlobalActionsCegComponent implements StaticComponentExample {
  html = template.default;
}
