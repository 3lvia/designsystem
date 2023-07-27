import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./typography-alignment-ceg.component.html';

@Component({
  selector: 'app-typography-alignment-ceg',
  templateUrl: './typography-alignment-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TypographyAlignmentCegComponent }],
})
export class TypographyAlignmentCegComponent implements StaticComponentExample {
  html = template.default;
}
