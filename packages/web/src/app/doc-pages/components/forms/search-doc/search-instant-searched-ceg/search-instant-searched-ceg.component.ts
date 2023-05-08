import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./search-instant-searched-ceg.component.html';

@Component({
  selector: 'app-search-instant-searched-ceg',
  templateUrl: './search-instant-searched-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: SearchInstantSearchedCegComponent }],
})
export class SearchInstantSearchedCegComponent implements StaticComponentExample {
  html = template.default;
}
