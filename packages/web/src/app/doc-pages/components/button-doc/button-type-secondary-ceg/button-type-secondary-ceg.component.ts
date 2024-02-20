import { Component } from '@angular/core';

import * as template from 'html-loader!./button-type-secondary-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-button-type-secondary-ceg',
  templateUrl: './button-type-secondary-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ButtonTypeSecondaryCegComponent }],
  standalone: true,
})
export class ButtonTypeSecondaryCegComponent implements StaticComponentExample {
  html = template.default;
}
