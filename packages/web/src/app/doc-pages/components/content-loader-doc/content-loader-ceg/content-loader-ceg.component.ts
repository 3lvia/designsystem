import { ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './content-loader-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-content-loader-ceg',
  templateUrl: './content-loader-ceg.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [{ provide: StaticComponentExample, useExisting: ContentLoaderCegComponent }],
})
export class ContentLoaderCegComponent implements StaticComponentExample {
  html = template.default;
}
