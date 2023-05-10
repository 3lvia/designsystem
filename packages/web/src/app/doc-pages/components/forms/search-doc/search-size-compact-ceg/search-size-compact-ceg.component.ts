import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./search-size-compact-ceg.component.html';

@Component({
  selector: 'app-search-size-compact-ceg',
  templateUrl: './search-size-compact-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: SearchSizeCompactCegComponent }],
})
export class SearchSizeCompactCegComponent implements StaticComponentExample {
  html = template.default;
}
