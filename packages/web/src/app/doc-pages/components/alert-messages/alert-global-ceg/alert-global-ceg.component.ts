import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './alert-global-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-alert-global-ceg',
  templateUrl: './alert-global-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AlertGlobalCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AlertGlobalCegComponent implements StaticComponentExample {
  html = template.default;
}
