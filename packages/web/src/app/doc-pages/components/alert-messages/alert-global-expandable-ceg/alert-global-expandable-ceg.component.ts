import { Component } from '@angular/core';

import * as template from 'html-loader!./alert-global-expandable-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-alert-global-expandable-ceg',
  templateUrl: './alert-global-expandable-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AlertGlobalExpandableCegComponent }],
  standalone: true,
})
export class AlertGlobalExpandableCegComponent implements StaticComponentExample {
  html = template.default;
}
