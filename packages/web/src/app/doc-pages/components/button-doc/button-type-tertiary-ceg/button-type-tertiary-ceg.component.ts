import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./button-type-tertiary-ceg.component.html';

@Component({
  selector: 'app-button-type-tertiary-ceg',
  templateUrl: './button-type-tertiary-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ButtonTypeTertiaryCegComponent }],
  standalone: true,
})
export class ButtonTypeTertiaryCegComponent implements StaticComponentExample {
  html = template.default;
}
