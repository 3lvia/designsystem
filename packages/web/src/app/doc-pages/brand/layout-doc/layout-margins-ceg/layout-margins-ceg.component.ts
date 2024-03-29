import { Component } from '@angular/core';

import * as template from './layout-margins-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-layout-margins-ceg',
  templateUrl: './layout-margins-ceg.component.html',
  styleUrls: ['./../layout-doc.component.scss'],
  providers: [{ provide: StaticComponentExample, useExisting: LayoutMarginsCegComponent }],
  standalone: true,
})
export class LayoutMarginsCegComponent implements StaticComponentExample {
  html = template.default;
}
