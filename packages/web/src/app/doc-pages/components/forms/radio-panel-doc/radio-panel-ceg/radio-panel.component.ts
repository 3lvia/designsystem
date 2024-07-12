import { Component } from '@angular/core';

import * as template from './radio-panel-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-radio-panel-ceg',
  templateUrl: './radio-panel-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: RadioPanelCegComponent }],
  standalone: true,
})
export class RadioPanelCegComponent implements StaticComponentExample {
  html = template.default;
}
