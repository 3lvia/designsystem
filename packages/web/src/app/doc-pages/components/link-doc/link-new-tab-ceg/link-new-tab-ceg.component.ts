import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './link-new-tab-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-link-new-tab-ceg',
  templateUrl: './link-new-tab-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: LinkNewTabCegComponent }],
  changeDetection: ChangeDetectionStrategy.Eager,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LinkNewTabCegComponent implements StaticComponentExample {
  html = template.default;
}
