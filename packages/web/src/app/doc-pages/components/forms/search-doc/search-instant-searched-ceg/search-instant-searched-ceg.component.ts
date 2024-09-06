import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './search-instant-searched-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-search-instant-searched-ceg',
  templateUrl: './search-instant-searched-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: SearchInstantSearchedCegComponent }],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchInstantSearchedCegComponent implements StaticComponentExample {
  html = template.default;
}
