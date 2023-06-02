import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./checkbox-standard-ceg.component.html';

@Component({
  selector: 'app-checkbox-standard-ceg',
  templateUrl: './checkbox-standard-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: CheckboxStandardCegComponent }],
})
export class CheckboxStandardCegComponent implements StaticComponentExample {
  html = template.default;
}
