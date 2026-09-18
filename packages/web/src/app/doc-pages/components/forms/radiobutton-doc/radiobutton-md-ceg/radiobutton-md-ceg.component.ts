import { ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './radiobutton-md-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-radiobutton-md-ceg',
  templateUrl: './radiobutton-md-ceg.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [{ provide: StaticComponentExample, useExisting: RadiobuttonMdCegComponent }],
})
export class RadiobuttonMdCegComponent implements StaticComponentExample {
  html = template.default;
}
