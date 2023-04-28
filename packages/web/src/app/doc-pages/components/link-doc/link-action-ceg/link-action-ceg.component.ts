import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./link-action-ceg.component.html';

@Component({
  selector: 'app-link-action-ceg',
  templateUrl: './link-action-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: LinkActionCegComponent }],
})
export class LinkActionCegComponent implements StaticComponentExample {
  html = template.default;
}
