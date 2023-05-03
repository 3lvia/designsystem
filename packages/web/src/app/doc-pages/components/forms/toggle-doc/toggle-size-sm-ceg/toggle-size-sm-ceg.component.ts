import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./toggle-size-sm-ceg.component.html';

@Component({
  selector: 'app-toggle-size-sm-ceg',
  templateUrl: './toggle-size-sm-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ToggleSizeSmCegComponent }],
})
export class ToggleSizeSmCegComponent implements StaticComponentExample {
  html = template.default;
}
