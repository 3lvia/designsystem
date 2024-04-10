import { Component } from '@angular/core';

import * as template from './toggle-size-md-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-toggle-size-md-ceg',
  templateUrl: './toggle-size-md-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ToggleSizeMdCegComponent }],
  standalone: true,
})
export class ToggleSizeMdCegComponent implements StaticComponentExample {
  html = template.default;
}
