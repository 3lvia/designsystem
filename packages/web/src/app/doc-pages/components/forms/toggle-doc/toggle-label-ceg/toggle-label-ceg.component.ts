import { Component } from '@angular/core';

import * as template from './toggle-label-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-toggle-label-ceg',
  templateUrl: './toggle-label-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ToggleLabelCegComponent }],
})
export class ToggleLabelCegComponent implements StaticComponentExample {
  html = template.default;
}
