import { Component } from '@angular/core';

import * as template from './search-instant-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-search-instant-ceg',
  templateUrl: './search-instant-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: SearchInstantCegComponent }],
  standalone: true,
})
export class SearchInstantCegComponent implements StaticComponentExample {
  html = template.default;
}
