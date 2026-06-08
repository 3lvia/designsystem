import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './link-back-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-link-back-ceg',
  templateUrl: './link-back-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: LinkBackCegComponent }],
  changeDetection: ChangeDetectionStrategy.Eager,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LinkBackCegComponent implements StaticComponentExample {
  html = template.default;
}
