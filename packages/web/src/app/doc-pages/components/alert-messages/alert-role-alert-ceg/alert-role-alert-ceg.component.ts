import { Component } from '@angular/core';

import * as template from './alert-role-alert-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-alert-role-alert-ceg',
  templateUrl: './alert-role-alert-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AlertRoleAlertCegComponent }],
  standalone: true,
})
export class AlertRoleAlertCegComponent implements StaticComponentExample {
  html = template.default;
}
