import { Component } from '@angular/core';

import * as template from 'html-loader!./toggle-size-sm-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-toggle-size-sm-ceg',
  templateUrl: './toggle-size-sm-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ToggleSizeSmCegComponent }],
  standalone: true,
})
export class ToggleSizeSmCegComponent implements StaticComponentExample {
  html = template.default;
}
