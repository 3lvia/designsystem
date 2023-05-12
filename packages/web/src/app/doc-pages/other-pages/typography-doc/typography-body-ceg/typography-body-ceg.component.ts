import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./typography-body-ceg.component.html';

@Component({
  selector: 'app-typography-body-ceg',
  templateUrl: './typography-body-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TypographyBodyCegComponent }],
})
export class TypographyBodyCegComponent implements StaticComponentExample {
  html = template.default;
}
