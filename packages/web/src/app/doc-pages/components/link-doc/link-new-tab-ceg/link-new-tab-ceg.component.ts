import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./link-new-tab-ceg.component.html';

@Component({
  selector: 'app-link-new-tab-ceg',
  templateUrl: './link-new-tab-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: LinkNewTabCegComponent }],
})
export class LinkNewTabCegComponent implements StaticComponentExample {
  html = template.default;
}
