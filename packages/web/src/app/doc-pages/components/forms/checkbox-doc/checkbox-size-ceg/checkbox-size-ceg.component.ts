import { Component } from '@angular/core';

import * as template from 'html-loader!./checkbox-size-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-checkbox-size-ceg',
  templateUrl: './checkbox-size-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: CheckboxSizeCegComponent }],
  standalone: true,
})
export class CheckboxSizeCegComponent implements StaticComponentExample {
  html = template.default;
}
