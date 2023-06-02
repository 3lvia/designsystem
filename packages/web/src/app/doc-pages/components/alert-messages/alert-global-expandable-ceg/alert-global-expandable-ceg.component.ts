import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./alert-global-expandable-ceg.component.html';

@Component({
  selector: 'app-alert-global-expandable-ceg',
  templateUrl: './alert-global-expandable-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AlertGlobalExpandableCegComponent }],
})
export class AlertGlobalExpandableCegComponent implements StaticComponentExample {
  html = template.default;
}
