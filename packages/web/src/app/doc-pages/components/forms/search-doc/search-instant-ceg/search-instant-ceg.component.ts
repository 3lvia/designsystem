import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './search-instant-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-search-instant-ceg',
  templateUrl: './search-instant-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: SearchInstantCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchInstantCegComponent implements StaticComponentExample {
  html = template.default;
}
