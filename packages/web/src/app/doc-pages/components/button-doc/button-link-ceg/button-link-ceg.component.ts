import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./button-link-ceg.component.html';

@Component({
  selector: 'app-button-link-ceg',
  templateUrl: './button-link-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ButtonLinkCegComponent }],
})
export class ButtonLinkCegComponent implements StaticComponentExample {
  html = template.default;
}
