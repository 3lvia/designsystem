import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './empty-state-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-empty-state-ceg',
  templateUrl: './empty-state-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: EmptyStateCegComponent }],
  changeDetection: ChangeDetectionStrategy.Eager,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmptyStateCegComponent {
  html = template.default;
}
