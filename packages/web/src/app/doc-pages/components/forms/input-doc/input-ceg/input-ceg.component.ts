import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./input-ceg.component.html';

@Component({
  selector: 'app-input-ceg',
  templateUrl: './input-ceg.component.html',
  styleUrls: ['./input-ceg.component.scss'],
  providers: [{ provide: StaticComponentExample, useExisting: InputCegComponent }],
})
export class InputCegComponent implements StaticComponentExample {
  html = template.default;
}
