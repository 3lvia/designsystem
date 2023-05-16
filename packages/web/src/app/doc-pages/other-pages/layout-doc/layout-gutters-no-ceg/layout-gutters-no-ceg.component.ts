import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./layout-gutters-no-ceg.component.html';

@Component({
  selector: 'app-layout-gutters-no-ceg',
  templateUrl: './layout-gutters-no-ceg.component.html',
  styleUrls: ['./../layout-doc.component.scss'],
  providers: [{ provide: StaticComponentExample, useExisting: LayoutGuttersNoCegComponent }],
})
export class LayoutGuttersNoCegComponent implements StaticComponentExample {
  html = template.default;
}
