import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./content-loader-box-ceg.component.html';

@Component({
  selector: 'app-content-loader-box-ceg',
  templateUrl: './content-loader-box-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ContentLoaderBoxCegComponent }],
})
export class ContentLoaderBoxCegComponent implements StaticComponentExample {
  html = template.default;
}
