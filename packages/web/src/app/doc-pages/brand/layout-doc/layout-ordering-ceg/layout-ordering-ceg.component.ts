import { Component } from '@angular/core';

import * as template from './layout-ordering-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-layout-ordering-ceg',
  templateUrl: './layout-ordering-ceg.component.html',
  styleUrls: ['./../layout-doc.component.scss'],
  providers: [{ provide: StaticComponentExample, useExisting: LayoutOrderingCegComponent }],
  standalone: true,
})
export class LayoutOrderingCegComponent implements StaticComponentExample {
  html = template.default;
}
