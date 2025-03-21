import { Component } from '@angular/core';

import * as template from './input-suffix-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-input-suffix-ceg',
  templateUrl: './input-suffix-ceg.component.html',
  styleUrls: ['./input-suffix-ceg.component.scss'],
  providers: [{ provide: StaticComponentExample, useExisting: InputSuffixCegComponent }],
})
export class InputSuffixCegComponent implements StaticComponentExample {
  html = template.default;
}
