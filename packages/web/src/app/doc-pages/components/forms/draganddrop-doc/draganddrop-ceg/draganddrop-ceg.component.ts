import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./draganddrop-ceg.component.html';

@Component({
  selector: 'app-draganddrop-ceg',
  templateUrl: './draganddrop-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: DraganddropCegComponent }],
})
export class DraganddropCegComponent implements StaticComponentExample {
  html = template.default;
}
