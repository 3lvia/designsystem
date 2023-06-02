import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./alert-role-alert-ceg.component.html';

@Component({
  selector: 'app-alert-role-alert-ceg',
  templateUrl: './alert-role-alert-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AlertRoleAlertCegComponent }],
})
export class AlertRoleAlertCegComponent implements StaticComponentExample {
  html = template.default;
}
