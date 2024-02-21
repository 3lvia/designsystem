import { Component } from '@angular/core';

import * as template from 'html-loader!./layout-gutters-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-layout-gutters-ceg',
  templateUrl: './layout-gutters-ceg.component.html',
  styleUrls: ['./../layout-doc.component.scss'],
  providers: [{ provide: StaticComponentExample, useExisting: LayoutGuttersCegComponent }],
  standalone: true,
})
export class LayoutGuttersCegComponent implements StaticComponentExample {
  html = template.default;
}
