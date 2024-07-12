import { Component } from '@angular/core';

import * as template from './radio-panel-detailed-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-radio-panel-detailed-ceg',
  templateUrl: './radio-panel-detailed-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: RadioPanelDetailedCegComponent }],
  standalone: true,
})
export class RadioPanelDetailedCegComponent implements StaticComponentExample {
  html = template.default;
}
