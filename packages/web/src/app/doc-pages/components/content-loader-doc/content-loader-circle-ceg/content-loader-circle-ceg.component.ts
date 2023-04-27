import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./content-loader-circle-ceg.component.html';

@Component({
  selector: 'app-content-loader-circle-ceg',
  templateUrl: './content-loader-circle-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ContentLoaderCircleCegComponent }],
})
export class ContentLoaderCircleCegComponent implements StaticComponentExample {
  html = template.default;
}
