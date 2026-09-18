import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './outline-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-outline-ceg',
  templateUrl: './outline-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: OutlineCegComponent }],
  changeDetection: ChangeDetectionStrategy.Eager,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OutlineCegComponent implements StaticComponentExample {
  html = template.default;
}
