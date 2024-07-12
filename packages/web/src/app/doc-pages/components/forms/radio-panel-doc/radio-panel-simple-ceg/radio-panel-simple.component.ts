import { Component } from '@angular/core';

import * as template from './radio-panel-simple-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-radio-panel-simple-ceg',
  templateUrl: './radio-panel-simple-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: RadioPanelSimpleCegComponent }],
  standalone: true,
})
export class RadioPanelSimpleCegComponent implements StaticComponentExample {
  html = template.default;
}
