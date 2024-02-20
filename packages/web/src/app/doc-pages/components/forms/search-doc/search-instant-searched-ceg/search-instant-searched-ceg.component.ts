import { Component } from '@angular/core';

import * as template from 'html-loader!./search-instant-searched-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-search-instant-searched-ceg',
  templateUrl: './search-instant-searched-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: SearchInstantSearchedCegComponent }],
  standalone: true,
})
export class SearchInstantSearchedCegComponent implements StaticComponentExample {
  html = template.default;
}
