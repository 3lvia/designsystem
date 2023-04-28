import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./link-sizes-ceg.component.html';

@Component({
  selector: 'app-link-sizes-ceg',
  templateUrl: './link-sizes-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: LinkSizesCegComponent }],
})
export class LinkSizesCegComponent implements StaticComponentExample {
  html = template.default;
}
