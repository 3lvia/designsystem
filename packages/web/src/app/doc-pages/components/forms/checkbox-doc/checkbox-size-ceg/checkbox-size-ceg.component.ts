import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./checkbox-size-ceg.component.html';

@Component({
  selector: 'app-checkbox-size-ceg',
  templateUrl: './checkbox-size-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: CheckboxSizeCegComponent }],
})
export class CheckboxSizeCegComponent implements StaticComponentExample {
  html = template.default;
}
