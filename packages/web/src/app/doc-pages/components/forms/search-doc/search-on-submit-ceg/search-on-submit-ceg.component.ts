import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./search-on-submit-ceg.component.html';

@Component({
  selector: 'app-search-on-submit-ceg',
  templateUrl: './search-on-submit-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: SearchOnSubmitCegComponent }],
})
export class SearchOnSubmitCegComponent implements StaticComponentExample {
  html = template.default;
}
