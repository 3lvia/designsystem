import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./button-badge-ceg.component.html';

@Component({
  selector: 'app-button-badge-ceg',
  templateUrl: './button-badge-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ButtonBadgeCegComponent }],
})
export class ButtonBadgeCegComponent implements StaticComponentExample {
  html = template.default;
}
