import { Component } from '@angular/core';

import * as template from './link-inline-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-link-inline-ceg',
  templateUrl: './link-inline-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: LinkInlineCegComponent }],
})
export class LinkInlineCegComponent implements StaticComponentExample {
  html = template.default;
}
