import { Component } from '@angular/core';

import * as template from './input-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-input-ceg',
  templateUrl: './input-ceg.component.html',
  styleUrls: ['./input-ceg.component.scss'],
  providers: [{ provide: StaticComponentExample, useExisting: InputCegComponent }],
  standalone: true,
})
export class InputCegComponent implements StaticComponentExample {
  html = template.default;
}
