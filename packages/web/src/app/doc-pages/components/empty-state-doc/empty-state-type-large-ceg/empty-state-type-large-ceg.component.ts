import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './empty-state-type-large-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-empty-state-type-large-ceg',
  templateUrl: './empty-state-type-large-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: EmptyStateTypeLargeCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmptyStateTypeLargeCegComponent {
  html = template.default;
}
