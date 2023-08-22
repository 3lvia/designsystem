import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./search-size-medium-ceg.component.html';

@Component({
  selector: 'app-search-size-medium-ceg',
  templateUrl: './search-size-medium-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: SearchSizeMediumCegComponent }],
})
export class SearchSizeMediumCegComponent implements StaticComponentExample {
  html = template.default;
}
