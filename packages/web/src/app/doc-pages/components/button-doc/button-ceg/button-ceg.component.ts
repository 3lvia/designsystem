import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./button-ceg.component.html';

@Component({
  selector: 'app-button-ceg',
  templateUrl: './button-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ButtonCegComponent }],
})
export class ButtonCegComponent implements StaticComponentExample {
  html = template.default;
}
