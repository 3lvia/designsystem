import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './search-on-submit-searched-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-search-on-submit-searched-ceg',
  templateUrl: './search-on-submit-searched-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: SearchOnSubmitSearchedCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchOnSubmitSearchedCegComponent implements StaticComponentExample {
  html = template.default;
}
