import { Component } from '@angular/core';

import * as template from './layout-levels-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-layout-levels-ceg',
  templateUrl: './layout-levels-ceg.component.html',
  styleUrls: ['./../layout-doc.component.scss'],
  providers: [{ provide: StaticComponentExample, useExisting: LayoutLevelsCegComponent }],
})
export class LayoutLevelsCegComponent implements StaticComponentExample {
  html = template.default;
}
