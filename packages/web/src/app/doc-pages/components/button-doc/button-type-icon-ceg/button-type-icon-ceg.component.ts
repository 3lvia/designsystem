import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./button-type-icon-ceg.component.html';

@Component({
  selector: 'app-button-type-icon-ceg',
  templateUrl: './button-type-icon-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ButtonTypeIconCegComponent }],
})
export class ButtonTypeIconCegComponent implements StaticComponentExample {
  html = template.default;
}
