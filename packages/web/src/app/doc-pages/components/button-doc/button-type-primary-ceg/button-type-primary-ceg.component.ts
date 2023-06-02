import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./button-type-primary-ceg.component.html';

@Component({
  selector: 'app-button-type-primary-ceg',
  templateUrl: './button-type-primary-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ButtonTypePrimaryCegComponent }],
})
export class ButtonTypePrimaryCegComponent implements StaticComponentExample {
  html = template.default;
}
