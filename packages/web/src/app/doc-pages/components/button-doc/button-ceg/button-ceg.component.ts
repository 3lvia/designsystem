import { ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './button-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-button-ceg',
  templateUrl: './button-ceg.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [{ provide: StaticComponentExample, useExisting: ButtonCegComponent }],
})
export class ButtonCegComponent implements StaticComponentExample {
  html = template.default;
}
