import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./alert-global-ceg.component.html';

@Component({
  selector: 'app-alert-global-ceg',
  templateUrl: './alert-global-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AlertGlobalCegComponent }],
})
export class AlertGlobalCegComponent implements StaticComponentExample {
  html = template.default;
}
