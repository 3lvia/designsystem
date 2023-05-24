import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./search-instant-ceg.component.html';

@Component({
  selector: 'app-search-instant-ceg',
  templateUrl: './search-instant-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: SearchInstantCegComponent }],
})
export class SearchInstantCegComponent implements StaticComponentExample {
  html = template.default;
}
