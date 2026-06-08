import { ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './list-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-list-ceg',
  templateUrl: './list-ceg.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [{ provide: StaticComponentExample, useExisting: ListCegComponent }],
})
export class ListCegComponent implements StaticComponentExample {
  html = template.default;
}
