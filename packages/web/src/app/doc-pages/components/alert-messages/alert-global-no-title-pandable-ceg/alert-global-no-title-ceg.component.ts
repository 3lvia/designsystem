import { Component } from '@angular/core';

import * as template from 'html-loader!./alert-global-no-title-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-alert-global-no-title-ceg',
  templateUrl: './alert-global-no-title-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AlertGlobalNoTitleCegComponent }],
  standalone: true,
})
export class AlertGlobalNoTitleCegComponent implements StaticComponentExample {
  html = template.default;
}
