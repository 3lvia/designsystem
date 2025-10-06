import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import * as template from './empty-state-type-start-aligned-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-empty-state-type-start-aligned-ceg',
  templateUrl: './empty-state-type-start-aligned-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: EmptyStateTypeStartAlignedCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmptyStateTypeStartAlignedCegComponent {
  html = template.default;
}
