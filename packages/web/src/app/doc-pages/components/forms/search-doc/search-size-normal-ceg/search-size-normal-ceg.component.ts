import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./search-size-normal-ceg.component.html';

@Component({
  selector: 'app-search-size-normal-ceg',
  templateUrl: './search-size-normal-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: SearchSizeNormalCegComponent }],
})
export class SearchSizeNormalCegComponent implements StaticComponentExample {
  html = template.default;
}
