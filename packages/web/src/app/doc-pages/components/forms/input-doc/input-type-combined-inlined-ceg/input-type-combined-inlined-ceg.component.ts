import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./input-type-combined-inlined-ceg.component.html';

@Component({
  selector: 'app-input-type-combined-inlined-ceg',
  templateUrl: './input-type-combined-inlined-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputTypeCombinedInlinedCegComponent }],
})
export class InputTypeCombinedInlinedCegComponent implements StaticComponentExample {
  html = template.default;
}
