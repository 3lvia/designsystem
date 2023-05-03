import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./checkbox-nested-ceg.component.html';

@Component({
  selector: 'app-checkbox-nested-ceg',
  templateUrl: './checkbox-nested-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: CheckboxNestedCegComponent }],
})
export class CheckboxNestedCegComponent implements StaticComponentExample {
  html = template.default;
}
