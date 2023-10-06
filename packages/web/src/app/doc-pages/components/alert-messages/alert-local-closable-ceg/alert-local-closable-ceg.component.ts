import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./alert-local-closable-ceg.component.html';

@Component({
  selector: 'app-alert-local-closable-ceg',
  templateUrl: './alert-local-closable-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AlertLocalClosableCegComponent }],
})
export class AlertLocalClosableCegComponent implements StaticComponentExample {
  html = template.default;
}
