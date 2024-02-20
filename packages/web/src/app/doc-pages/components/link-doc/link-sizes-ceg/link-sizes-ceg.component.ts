import { Component } from '@angular/core';

import * as template from 'html-loader!./link-sizes-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-link-sizes-ceg',
  templateUrl: './link-sizes-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: LinkSizesCegComponent }],
  standalone: true,
})
export class LinkSizesCegComponent implements StaticComponentExample {
  html = template.default;
}
