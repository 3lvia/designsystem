import { Component } from '@angular/core';

import * as template from './search-size-medium-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-search-size-medium-ceg',
  templateUrl: './search-size-medium-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: SearchSizeMediumCegComponent }],
  standalone: true,
})
export class SearchSizeMediumCegComponent implements StaticComponentExample {
  html = template.default;
}
