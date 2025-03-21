import { Component } from '@angular/core';

import * as template from './layout-breakpoints-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-layout-breakpoints-ceg',
  templateUrl: './layout-breakpoints-ceg.component.html',
  styleUrls: ['./../layout-doc.component.scss'],
  providers: [{ provide: StaticComponentExample, useExisting: LayoutBreakpointsCegComponent }],
})
export class LayoutBreakpointsCegComponent implements StaticComponentExample {
  html = template.default;
}
