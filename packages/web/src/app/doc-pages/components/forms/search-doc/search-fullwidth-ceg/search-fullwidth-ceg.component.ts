import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './search-fullwidth-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-search-fullwidth-ceg',
  templateUrl: './search-fullwidth-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: SearchFullwidthCegComponent }],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchFullwidthCegComponent implements StaticComponentExample {
  html = template.default;
}
