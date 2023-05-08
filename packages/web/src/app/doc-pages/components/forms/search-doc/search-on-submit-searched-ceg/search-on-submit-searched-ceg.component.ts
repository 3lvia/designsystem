import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./search-on-submit-searched-ceg.component.html';

@Component({
  selector: 'app-search-on-submit-searched-ceg',
  templateUrl: './search-on-submit-searched-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: SearchOnSubmitSearchedCegComponent }],
})
export class SearchOnSubmitSearchedCegComponent implements StaticComponentExample {
  html = template.default;
}
