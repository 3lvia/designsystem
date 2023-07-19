import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./layout-margins-ceg.component.html';

@Component({
  selector: 'app-layout-margins-ceg',
  templateUrl: './layout-margins-ceg.component.html',
  styleUrls: ['./../layout-doc.component.scss'],
  providers: [{ provide: StaticComponentExample, useExisting: LayoutMarginsCegComponent }],
})
export class LayoutMarginsCegComponent implements StaticComponentExample {
  html = template.default;
}
