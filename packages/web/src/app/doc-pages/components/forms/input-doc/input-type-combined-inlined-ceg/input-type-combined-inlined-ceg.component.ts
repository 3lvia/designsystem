import { Component } from '@angular/core';

import * as template from './input-type-combined-inlined-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-input-type-combined-inlined-ceg',
  templateUrl: './input-type-combined-inlined-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputTypeCombinedInlinedCegComponent }],
})
export class InputTypeCombinedInlinedCegComponent implements StaticComponentExample {
  html = template.default;
}
