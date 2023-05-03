import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./thumbnail-ceg.component.html';

@Component({
  selector: 'app-thumbnail-ceg',
  templateUrl: './thumbnail-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ThumbnailCegComponent }],
})
export class ThumbnailCegComponent implements StaticComponentExample {
  html = template.default;
}
