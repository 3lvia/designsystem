import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./alert-global-actions-ceg.component.html';

@Component({
  selector: 'app-alert-global-actions-ceg',
  templateUrl: './alert-global-actions-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AlertGlobalActionsCegComponent }],
})
export class AlertGlobalActionsCegComponent implements StaticComponentExample {
  html = template.default;
}
