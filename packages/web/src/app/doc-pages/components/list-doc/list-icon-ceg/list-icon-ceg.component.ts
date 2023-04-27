import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./list-icon-ceg.component.html';

@Component({
  selector: 'app-list-icon-ceg',
  templateUrl: './list-icon-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: IconListCegComponent }],
})
export class IconListCegComponent implements StaticComponentExample {
  html = template.default;
}
