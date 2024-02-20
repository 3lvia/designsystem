import { Component } from '@angular/core';

import * as template from 'html-loader!./thumbnail-selected-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-thumbnail-selected-ceg',
  templateUrl: './thumbnail-selected-ceg.component.html',
  styleUrls: ['./thumbnail-selected-ceg.component.scss'],
  providers: [{ provide: StaticComponentExample, useExisting: ThumbnailSelectedCegComponent }],
  standalone: true,
})
export class ThumbnailSelectedCegComponent implements StaticComponentExample {
  html = template.default;
}
