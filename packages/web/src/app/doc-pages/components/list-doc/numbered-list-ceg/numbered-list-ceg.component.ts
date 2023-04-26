import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./numbered-list-ceg.component.html';

@Component({
  selector: 'app-numbered-list-ceg',
  templateUrl: './numbered-list-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: NumberedListCegComponent }],
})
export class NumberedListCegComponent implements StaticComponentExample {
  html = template.default;
}
