import { Component } from '@angular/core';

import * as template from './input-type-textarea-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-input-type-textarea-ceg',
  templateUrl: './input-type-textarea-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputTypeTextareaCegComponent }],
})
export class InputTypeTextareaCegComponent implements StaticComponentExample {
  html = template.default;
}
