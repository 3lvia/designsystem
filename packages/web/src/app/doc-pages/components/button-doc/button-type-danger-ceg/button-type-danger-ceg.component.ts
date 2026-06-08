import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './button-type-danger-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-button-type-danger-ceg',
  templateUrl: './button-type-danger-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ButtonTypeDangerCegComponent }],
  changeDetection: ChangeDetectionStrategy.Eager,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ButtonTypeDangerCegComponent implements StaticComponentExample {
  html = template.default;
}
