import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./input-size-compact-ceg.component.html';

@Component({
  selector: 'app-input-size-compact-ceg',
  templateUrl: './input-size-compact-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputSizeCompactCegComponent }],
})
export class InputSizeCompactCegComponent implements StaticComponentExample {
  html = template.default;
}
