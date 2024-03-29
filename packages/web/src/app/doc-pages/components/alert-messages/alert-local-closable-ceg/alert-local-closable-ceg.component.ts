import { Component } from '@angular/core';

import * as template from './alert-local-closable-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-alert-local-closable-ceg',
  templateUrl: './alert-local-closable-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AlertLocalClosableCegComponent }],
  standalone: true,
})
export class AlertLocalClosableCegComponent implements StaticComponentExample {
  html = template.default;
}
