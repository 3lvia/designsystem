import { Component } from '@angular/core';

import * as template from 'html-loader!./content-loader-circle-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-content-loader-circle-ceg',
  templateUrl: './content-loader-circle-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ContentLoaderCircleCegComponent }],
  standalone: true,
})
export class ContentLoaderCircleCegComponent implements StaticComponentExample {
  html = template.default;
}
