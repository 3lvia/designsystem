import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./link-inline-ceg.component.html';

@Component({
  selector: 'app-link-inline-ceg',
  templateUrl: './link-inline-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: LinkInlineCegComponent }],
})
export class LinkInlineCegComponent implements StaticComponentExample {
  html = template.default;
}
