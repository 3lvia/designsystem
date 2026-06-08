import { ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './content-loader-box-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-content-loader-box-ceg',
  templateUrl: './content-loader-box-ceg.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [{ provide: StaticComponentExample, useExisting: ContentLoaderBoxCegComponent }],
})
export class ContentLoaderBoxCegComponent implements StaticComponentExample {
  html = template.default;
}
