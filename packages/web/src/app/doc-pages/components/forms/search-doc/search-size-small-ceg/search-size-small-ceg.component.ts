import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './search-size-small-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-search-size-small-ceg',
  templateUrl: './search-size-small-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: SearchSizeSmallCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchSizeSmallCegComponent implements StaticComponentExample {
  html = template.default;
}
