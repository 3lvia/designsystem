import { ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './link-sizes-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-link-sizes-ceg',
  templateUrl: './link-sizes-ceg.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [{ provide: StaticComponentExample, useExisting: LinkSizesCegComponent }],
})
export class LinkSizesCegComponent implements StaticComponentExample {
  html = template.default;
}
