import { Component } from '@angular/core';

import * as template from './link-as-btn-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-link-as-btn-ceg',
  templateUrl: './link-as-btn-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: LinkAsBtnCegComponent }],
})
export class LinkAsBtnCegComponent implements StaticComponentExample {
  html = template.default;
}
