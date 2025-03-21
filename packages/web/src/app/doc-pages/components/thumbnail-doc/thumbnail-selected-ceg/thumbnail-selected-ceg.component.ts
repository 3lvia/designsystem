import { Component } from '@angular/core';

import * as template from './thumbnail-selected-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-thumbnail-selected-ceg',
  templateUrl: './thumbnail-selected-ceg.component.html',
  styleUrls: ['./thumbnail-selected-ceg.component.scss'],
  providers: [{ provide: StaticComponentExample, useExisting: ThumbnailSelectedCegComponent }],
})
export class ThumbnailSelectedCegComponent implements StaticComponentExample {
  html = template.default;
}
