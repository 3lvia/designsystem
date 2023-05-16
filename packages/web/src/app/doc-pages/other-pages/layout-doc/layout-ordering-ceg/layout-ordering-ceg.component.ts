import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./layout-ordering-ceg.component.html';

@Component({
  selector: 'app-layout-ordering-ceg',
  templateUrl: './layout-ordering-ceg.component.html',
  styleUrls: ['./../layout-doc.component.scss'],
  providers: [{ provide: StaticComponentExample, useExisting: LayoutOrderingCegComponent }],
})
export class LayoutOrderingCegComponent implements StaticComponentExample {
  html = template.default;
}
