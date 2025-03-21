import { Component } from '@angular/core';

import * as template from './content-loader-box-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-content-loader-box-ceg',
  templateUrl: './content-loader-box-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ContentLoaderBoxCegComponent }],
})
export class ContentLoaderBoxCegComponent implements StaticComponentExample {
  html = template.default;
}
