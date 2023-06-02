import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./button-size-ceg.component.html';

@Component({
  selector: 'app-button-size-ceg',
  templateUrl: './button-size-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ButtonSizeCegComponent }],
})
export class ButtonSizeCegComponent implements StaticComponentExample {
  html = template.default;
}
