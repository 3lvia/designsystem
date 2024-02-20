import { Component } from '@angular/core';

import * as template from 'html-loader!./link-new-tab-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-link-new-tab-ceg',
  templateUrl: './link-new-tab-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: LinkNewTabCegComponent }],
  standalone: true,
})
export class LinkNewTabCegComponent implements StaticComponentExample {
  html = template.default;
}
