import { Component } from '@angular/core';

import * as template from './alert-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-alert-ceg',
  templateUrl: './alert-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AlertCegComponent }],
  standalone: true,
})
export class AlertCegComponent implements StaticComponentExample {
  html = template.default;
}
