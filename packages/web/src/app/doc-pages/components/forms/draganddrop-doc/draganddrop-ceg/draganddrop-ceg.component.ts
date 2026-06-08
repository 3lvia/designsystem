import { ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './draganddrop-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-draganddrop-ceg',
  templateUrl: './draganddrop-ceg.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [{ provide: StaticComponentExample, useExisting: DraganddropCegComponent }],
})
export class DraganddropCegComponent implements StaticComponentExample {
  html = template.default;
}
