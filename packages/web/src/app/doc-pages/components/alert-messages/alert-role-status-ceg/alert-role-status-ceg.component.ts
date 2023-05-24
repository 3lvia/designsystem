import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./alert-role-status-ceg.component.html';

@Component({
  selector: 'app-alert-role-status-ceg',
  templateUrl: './alert-role-status-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AlertRoleStatusCegComponent }],
})
export class AlertRoleStatusCegComponent implements StaticComponentExample {
  html = template.default;
}
