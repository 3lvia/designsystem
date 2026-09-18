import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './list-icon-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-list-icon-ceg',
  templateUrl: './list-icon-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: IconListCegComponent }],
  changeDetection: ChangeDetectionStrategy.Eager,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IconListCegComponent implements StaticComponentExample {
  html = template.default;
}
