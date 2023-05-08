import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./search-fullwidth-ceg.component.html';

@Component({
  selector: 'app-search-fullwidth-ceg',
  templateUrl: './search-fullwidth-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: SearchFullwidthCegComponent }],
})
export class SearchFullwidthCegComponent implements StaticComponentExample {
  html = template.default;
}
