import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './search-on-submit-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-search-on-submit-ceg',
  templateUrl: './search-on-submit-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: SearchOnSubmitCegComponent }],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchOnSubmitCegComponent implements StaticComponentExample {
  html = template.default;
}
