import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./button-type-secondary-ceg.component.html';

@Component({
  selector: 'app-button-type-secondary-ceg',
  templateUrl: './button-type-secondary-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ButtonTypeSecondaryCegComponent }],
})
export class ButtonTypeSecondaryCegComponent implements StaticComponentExample {
  html = template.default;
}
