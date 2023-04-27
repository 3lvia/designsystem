import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./content-loader-ceg.component.html';

@Component({
  selector: 'app-content-loader-ceg',
  templateUrl: './content-loader-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ContentLoaderCegComponent }],
})
export class ContentLoaderCegComponent implements StaticComponentExample {
  html = template.default;
}
