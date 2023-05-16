import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./thumbnail-selected-ceg.component.html';

@Component({
  selector: 'app-thumbnail-selected-ceg',
  templateUrl: './thumbnail-selected-ceg.component.html',
  styleUrls: ['./thumbnail-selected-ceg.component.scss'],
  providers: [{ provide: StaticComponentExample, useExisting: ThumbnailSelectedCegComponent }],
})
export class ThumbnailSelectedCegComponent implements StaticComponentExample {
  html = template.default;
}
