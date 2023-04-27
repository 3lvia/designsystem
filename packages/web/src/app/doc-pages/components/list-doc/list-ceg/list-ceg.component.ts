import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./list-ceg.component.html';

@Component({
  selector: 'app-list-ceg',
  templateUrl: './list-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ListCegComponent }],
})
export class ListCegComponent implements StaticComponentExample {
  html = template.default;
}
