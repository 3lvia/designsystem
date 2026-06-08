import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './chip-image-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-chip-image-ceg',
  templateUrl: './chip-image-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ChipImageCegComponent }],
  changeDetection: ChangeDetectionStrategy.Eager,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChipImageCegComponent implements StaticComponentExample {
  html = template.default;
}
