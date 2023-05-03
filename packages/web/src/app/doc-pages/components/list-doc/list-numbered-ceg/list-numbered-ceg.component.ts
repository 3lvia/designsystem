import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./list-numbered-ceg.component.html';

@Component({
  selector: 'app-list-numbered-ceg',
  templateUrl: './list-numbered-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: NumberedListCegComponent }],
})
export class NumberedListCegComponent implements StaticComponentExample {
  html = template.default;
}
