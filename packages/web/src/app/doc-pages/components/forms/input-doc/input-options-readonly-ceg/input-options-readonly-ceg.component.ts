import { ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './input-options-readonly-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-input-options-readonly-ceg',
  templateUrl: './input-options-readonly-ceg.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [{ provide: StaticComponentExample, useExisting: InputOptionsReadonlyCegComponent }],
})
export class InputOptionsReadonlyCegComponent implements StaticComponentExample {
  html = template.default;
}
