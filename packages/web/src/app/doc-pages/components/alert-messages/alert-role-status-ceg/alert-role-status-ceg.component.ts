import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './alert-role-status-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-alert-role-status-ceg',
  templateUrl: './alert-role-status-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AlertRoleStatusCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AlertRoleStatusCegComponent implements StaticComponentExample {
  html = template.default;
}
