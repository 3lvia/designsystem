import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./search-size-small-ceg.component.html';

@Component({
  selector: 'app-search-size-small-ceg',
  templateUrl: './search-size-small-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: SearchSizeSmallCegComponent }],
})
export class SearchSizeSmallCegComponent implements StaticComponentExample {
  html = template.default;
}
