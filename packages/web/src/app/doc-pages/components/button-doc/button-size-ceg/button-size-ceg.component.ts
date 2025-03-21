import { Component } from '@angular/core';

import * as template from './button-size-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-button-size-ceg',
  templateUrl: './button-size-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ButtonSizeCegComponent }],
})
export class ButtonSizeCegComponent implements StaticComponentExample {
  html = template.default;
}
