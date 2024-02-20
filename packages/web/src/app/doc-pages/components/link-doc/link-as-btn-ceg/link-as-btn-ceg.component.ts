import { Component } from '@angular/core';

import * as template from 'html-loader!./link-as-btn-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-link-as-btn-ceg',
  templateUrl: './link-as-btn-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: LinkAsBtnCegComponent }],
  standalone: true,
})
export class LinkAsBtnCegComponent implements StaticComponentExample {
  html = template.default;
}
