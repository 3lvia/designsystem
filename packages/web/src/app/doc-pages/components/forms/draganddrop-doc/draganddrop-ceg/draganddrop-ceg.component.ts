import { Component } from '@angular/core';

import * as template from './draganddrop-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-draganddrop-ceg',
  templateUrl: './draganddrop-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: DraganddropCegComponent }],
  standalone: true,
})
export class DraganddropCegComponent implements StaticComponentExample {
  html = template.default;
}
