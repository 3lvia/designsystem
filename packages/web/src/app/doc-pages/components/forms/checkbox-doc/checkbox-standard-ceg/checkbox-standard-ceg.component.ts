import { Component } from '@angular/core';

import * as template from './checkbox-standard-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-checkbox-standard-ceg',
  templateUrl: './checkbox-standard-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: CheckboxStandardCegComponent }],
})
export class CheckboxStandardCegComponent implements StaticComponentExample {
  html = template.default;
}
