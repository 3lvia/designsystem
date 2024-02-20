import { Component } from '@angular/core';

import * as template from 'html-loader!./search-fullwidth-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-search-fullwidth-ceg',
  templateUrl: './search-fullwidth-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: SearchFullwidthCegComponent }],
  standalone: true,
})
export class SearchFullwidthCegComponent implements StaticComponentExample {
  html = template.default;
}
