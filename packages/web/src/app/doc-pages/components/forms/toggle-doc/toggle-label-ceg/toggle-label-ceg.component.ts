import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./toggle-label-ceg.component.html';

@Component({
  selector: 'app-toggle-label-ceg',
  templateUrl: './toggle-label-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ToggleLabelCegComponent }],
})
export class ToggleLabelCegComponent implements StaticComponentExample {
  html = template.default;
}
