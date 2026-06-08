import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './search-instant-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-search-instant-ceg',
  templateUrl: './search-instant-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: SearchInstantCegComponent }],
  changeDetection: ChangeDetectionStrategy.Eager,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchInstantCegComponent implements StaticComponentExample {
  html = template.default;
}
