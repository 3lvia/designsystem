import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./alert-role-note-ceg.component.html';

@Component({
  selector: 'app-alert-role-note-ceg',
  templateUrl: './alert-role-note-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AlertRoleNoteCegComponent }],
})
export class AlertRoleNoteCegComponent implements StaticComponentExample {
  html = template.default;
}
