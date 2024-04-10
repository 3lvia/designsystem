import { Component } from '@angular/core';

import * as template from './checkbox-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-checkbox-ceg',
  templateUrl: './checkbox-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: CheckboxCegComponent }],
  standalone: true,
})
export class CheckboxCegComponent implements StaticComponentExample {
  html = template.default;
}
