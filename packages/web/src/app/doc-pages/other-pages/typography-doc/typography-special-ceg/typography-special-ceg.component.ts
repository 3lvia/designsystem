import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./typography-special-ceg.component.html';

@Component({
  selector: 'app-typography-special-ceg',
  templateUrl: './typography-special-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TypographySpecialCegComponent }],
})
export class TypographySpecialCegComponent implements StaticComponentExample {
  html = template.default;
}
