import { Component } from '@angular/core';

import * as template from './button-type-primary-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-button-type-primary-ceg',
  templateUrl: './button-type-primary-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ButtonTypePrimaryCegComponent }],
  standalone: true,
})
export class ButtonTypePrimaryCegComponent implements StaticComponentExample {
  html = template.default;
}
