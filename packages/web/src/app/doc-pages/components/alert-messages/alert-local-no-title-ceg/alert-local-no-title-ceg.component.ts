import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./alert-local-no-title-ceg.component.html';

@Component({
  selector: 'app-alert-local-no-title-ceg',
  templateUrl: './alert-local-no-title-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AlertLocalNoTitleCegComponent }],
})
export class AlertLocalNoTitleCegComponent implements StaticComponentExample {
  html = template.default;
}
