import { ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './checkbox-nested-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-checkbox-nested-ceg',
  templateUrl: './checkbox-nested-ceg.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [{ provide: StaticComponentExample, useExisting: CheckboxNestedCegComponent }],
})
export class CheckboxNestedCegComponent implements StaticComponentExample {
  html = template.default;
}
