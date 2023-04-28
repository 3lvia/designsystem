import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./checkbox-ceg.component.html';

@Component({
  selector: 'app-checkbox-ceg',
  templateUrl: './checkbox-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: CheckboxCegComponent }],
})
export class CheckboxCegComponent implements StaticComponentExample {
  html = template.default;
}
