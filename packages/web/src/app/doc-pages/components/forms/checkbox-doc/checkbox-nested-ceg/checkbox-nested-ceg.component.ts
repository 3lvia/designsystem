import { Component } from '@angular/core';

import * as template from 'html-loader!./checkbox-nested-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-checkbox-nested-ceg',
  templateUrl: './checkbox-nested-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: CheckboxNestedCegComponent }],
  standalone: true,
})
export class CheckboxNestedCegComponent implements StaticComponentExample {
  html = template.default;
}
