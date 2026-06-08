import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './empty-state-type-default-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-empty-state-type-default-ceg',
  templateUrl: './empty-state-type-default-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: EmptyStateTypeDefaultCegComponent }],
  changeDetection: ChangeDetectionStrategy.Eager,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmptyStateTypeDefaultCegComponent {
  html = template.default;
}
