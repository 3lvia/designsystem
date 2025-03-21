import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './alert-global-closable-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-alert-global-closable-ceg',
  templateUrl: './alert-global-closable-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AlertGlobalClosableCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AlertGlobalClosableCegComponent implements StaticComponentExample {
  html = template.default;
}
