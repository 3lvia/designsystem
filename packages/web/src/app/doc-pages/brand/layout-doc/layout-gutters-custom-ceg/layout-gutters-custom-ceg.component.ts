import { Component } from '@angular/core';

import * as template from './layout-gutters-custom-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-layout-gutters-custom-ceg',
  templateUrl: './layout-gutters-custom-ceg.component.html',
  styleUrls: ['./../layout-doc.component.scss'],
  providers: [{ provide: StaticComponentExample, useExisting: LayoutGuttersCustomCegComponent }],
})
export class LayoutGuttersCustomCegComponent implements StaticComponentExample {
  html = template.default;
}
