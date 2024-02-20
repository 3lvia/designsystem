import { Component } from '@angular/core';

import * as template from 'html-loader!./link-action-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-link-action-ceg',
  templateUrl: './link-action-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: LinkActionCegComponent }],
  standalone: true,
})
export class LinkActionCegComponent implements StaticComponentExample {
  html = template.default;
}
