import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./input-type-textarea-ceg.component.html';

@Component({
  selector: 'app-input-type-textarea-ceg',
  templateUrl: './input-type-textarea-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: InputTypeTextareaCegComponent }],
})
export class InputTypeTextareaCegComponent implements StaticComponentExample {
  html = template.default;
}
