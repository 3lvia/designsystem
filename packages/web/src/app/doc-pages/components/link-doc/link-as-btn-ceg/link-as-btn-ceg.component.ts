import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./link-as-btn-ceg.component.html';

@Component({
  selector: 'app-link-as-btn-ceg',
  templateUrl: './link-as-btn-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: LinkAsBtnCegComponent }],
})
export class LinkAsBtnCegComponent implements StaticComponentExample {
  html = template.default;
}
