import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./alert-global-closable-ceg.component.html';

@Component({
  selector: 'app-alert-global-closable-ceg',
  templateUrl: './alert-global-closable-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AlertGlobalClosableCegComponent }],
})
export class AlertGlobalClosableCegComponent implements StaticComponentExample {
  html = template.default;
}
