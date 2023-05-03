import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./content-loader-text-ceg.component.html';

@Component({
  selector: 'app-content-loader-text-ceg',
  templateUrl: './content-loader-text-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ContentLoaderTextCegComponent }],
})
export class ContentLoaderTextCegComponent implements StaticComponentExample {
  html = template.default;
}
