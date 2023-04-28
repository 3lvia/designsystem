import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./toggle-size-md-ceg.component.html';

@Component({
  selector: 'app-toggle-size-md-ceg',
  templateUrl: './toggle-size-md-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ToggleSizeMdCegComponent }],
})
export class ToggleSizeMdCegComponent implements StaticComponentExample {
  html = template.default;
}
