import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./link-ceg.component.html';

@Component({
  selector: 'app-link-ceg',
  templateUrl: './link-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: LinkCegComponent }],
})
export class LinkCegComponent implements StaticComponentExample {
  html = template.default;
}
