import { ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './radiobutton-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-radiobutton-ceg',
  templateUrl: './radiobutton-ceg.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [{ provide: StaticComponentExample, useExisting: RadiobuttonCegComponent }],
})
export class RadiobuttonCegComponent implements StaticComponentExample {
  html = template.default;
}
