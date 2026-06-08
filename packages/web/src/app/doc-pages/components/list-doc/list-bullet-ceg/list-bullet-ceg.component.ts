import { ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './list-bullet-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-list-bullet-ceg',
  templateUrl: './list-bullet-ceg.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [{ provide: StaticComponentExample, useExisting: BulletListCegComponent }],
})
export class BulletListCegComponent implements StaticComponentExample {
  html = template.default;
}
