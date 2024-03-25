import { Component } from '@angular/core';

import * as template from './thumbnail-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-thumbnail-ceg',
  templateUrl: './thumbnail-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ThumbnailCegComponent }],
  standalone: true,
})
export class ThumbnailCegComponent implements StaticComponentExample {
  html = template.default;
}
