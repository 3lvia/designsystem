import { Component } from '@angular/core';

import * as template from 'html-loader!./list-icon-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-list-icon-ceg',
  templateUrl: './list-icon-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: IconListCegComponent }],
  standalone: true,
})
export class IconListCegComponent implements StaticComponentExample {
  html = template.default;
}
