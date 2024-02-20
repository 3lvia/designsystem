import { Component } from '@angular/core';

import * as template from 'html-loader!./layout-alignment-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-layout-alignment-ceg',
  templateUrl: './layout-alignment-ceg.component.html',
  styleUrls: ['./../layout-doc.component.scss'],
  providers: [{ provide: StaticComponentExample, useExisting: LayoutAlignmentCegComponent }],
  standalone: true,
})
export class LayoutAlignmentCegComponent implements StaticComponentExample {
  html = template.default;
}
