import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './alert-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-alert-ceg',
  templateUrl: './alert-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: AlertCegComponent }],
  changeDetection: ChangeDetectionStrategy.Eager,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AlertCegComponent implements StaticComponentExample {
  html = template.default;
}
