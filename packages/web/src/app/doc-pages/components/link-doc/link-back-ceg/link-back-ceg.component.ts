import { Component } from '@angular/core';

import * as template from 'html-loader!./link-back-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-link-back-ceg',
  templateUrl: './link-back-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: LinkBackCegComponent }],
  standalone: true,
})
export class LinkBackCegComponent implements StaticComponentExample {
  html = template.default;
}
