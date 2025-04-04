import { Component } from '@angular/core';

import * as template from './button-link-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-button-link-ceg',
  templateUrl: './button-link-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ButtonLinkCegComponent }],
})
export class ButtonLinkCegComponent implements StaticComponentExample {
  html = template.default;
}
