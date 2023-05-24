import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./button-type-danger-ceg.component.html';

@Component({
  selector: 'app-button-type-danger-ceg',
  templateUrl: './button-type-danger-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ButtonTypeDangerCegComponent }],
})
export class ButtonTypeDangerCegComponent implements StaticComponentExample {
  html = template.default;
}
