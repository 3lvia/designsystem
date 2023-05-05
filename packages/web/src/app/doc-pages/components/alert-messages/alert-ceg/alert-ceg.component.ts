import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./alert-ceg.component.html';

@Component({
  selector: 'app-alert-ceg',
  templateUrl: './alert-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AlertCegComponent }],
})
export class AlertCegComponent implements StaticComponentExample {
  html = template.default;
}
