import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./typography-titles-ceg.component.html';

@Component({
  selector: 'app-typography-titles-ceg',
  templateUrl: './typography-titles-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TypographyTitlesCegComponent }],
})
export class TypographyTitlesCegComponent implements StaticComponentExample {
  html = template.default;
}
