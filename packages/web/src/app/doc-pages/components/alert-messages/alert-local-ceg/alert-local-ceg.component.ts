import { Component } from '@angular/core';

import * as template from './alert-local-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-alert-local-ceg',
  templateUrl: './alert-local-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AlertLocalCegComponent }],
  standalone: true,
})
export class AlertLocalCegComponent implements StaticComponentExample {
  html = template.default;
}
