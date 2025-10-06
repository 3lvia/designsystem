import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './empty-state-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-empty-state-ceg',
  templateUrl: './empty-state-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: EmptyStateCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmptyStateCegComponent {
  html = template.default;
}
