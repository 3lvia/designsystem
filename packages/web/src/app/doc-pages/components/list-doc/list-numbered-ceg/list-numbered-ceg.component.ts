import { Component } from '@angular/core';

import * as template from './list-numbered-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-list-numbered-ceg',
  templateUrl: './list-numbered-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: NumberedListCegComponent }],
})
export class NumberedListCegComponent implements StaticComponentExample {
  html = template.default;
}
