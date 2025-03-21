import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './alert-role-note-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-alert-role-note-ceg',
  templateUrl: './alert-role-note-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AlertRoleNoteCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AlertRoleNoteCegComponent implements StaticComponentExample {
  html = template.default;
}
