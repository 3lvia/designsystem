import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./alert-local-ceg.component.html';

@Component({
  selector: 'app-alert-local-ceg',
  templateUrl: './alert-local-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AlertLocalCegComponent }],
})
export class AlertLocalCegComponent implements StaticComponentExample {
  html = template.default;
}
