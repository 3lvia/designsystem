import { Component } from '@angular/core';

import * as template from './content-loader-text-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-content-loader-text-ceg',
  templateUrl: './content-loader-text-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ContentLoaderTextCegComponent }],
})
export class ContentLoaderTextCegComponent implements StaticComponentExample {
  html = template.default;
}
