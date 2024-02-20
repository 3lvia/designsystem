import { Component } from '@angular/core';

import * as template from 'html-loader!./content-loader-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-content-loader-ceg',
  templateUrl: './content-loader-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ContentLoaderCegComponent }],
  standalone: true,
})
export class ContentLoaderCegComponent implements StaticComponentExample {
  html = template.default;
}
