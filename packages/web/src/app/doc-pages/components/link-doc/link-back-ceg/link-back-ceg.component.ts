import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./link-back-ceg.component.html';

@Component({
  selector: 'app-link-back-ceg',
  templateUrl: './link-back-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: LinkBackCegComponent }],
})
export class LinkBackCegComponent implements StaticComponentExample {
  html = template.default;
}
