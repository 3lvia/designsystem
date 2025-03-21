import { Component } from '@angular/core';

import * as template from './checkbox-size-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-checkbox-size-ceg',
  templateUrl: './checkbox-size-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: CheckboxSizeCegComponent }],
})
export class CheckboxSizeCegComponent implements StaticComponentExample {
  html = template.default;
}
