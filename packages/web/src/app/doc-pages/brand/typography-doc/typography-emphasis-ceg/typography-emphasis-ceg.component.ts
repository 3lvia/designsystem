import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./typography-emphasis-ceg.component.html';

@Component({
  selector: 'app-typography-emphasis-ceg',
  templateUrl: './typography-emphasis-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TypographyEmphasisCegComponent }],
})
export class TypographyEmphasisCegComponent implements StaticComponentExample {
  html = template.default;
}
