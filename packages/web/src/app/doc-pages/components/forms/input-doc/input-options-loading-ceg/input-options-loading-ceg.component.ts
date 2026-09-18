import { ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './input-options-loading-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-input-options-loading-ceg',
  templateUrl: './input-options-loading-ceg.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [{ provide: StaticComponentExample, useExisting: InputOptionsLoadingCegComponent }],
})
export class InputOptionsLoadingCegComponent implements StaticComponentExample {
  html = template.default;
}
