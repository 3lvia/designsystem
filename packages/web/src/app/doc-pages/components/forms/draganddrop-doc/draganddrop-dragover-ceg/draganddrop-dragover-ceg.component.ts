import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./draganddrop-dragover-ceg.component.html';

@Component({
  selector: 'app-draganddrop-dragover-ceg',
  templateUrl: './draganddrop-dragover-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: DraganddropDragoverCegComponent }],
})
export class DraganddropDragoverCegComponent implements StaticComponentExample {
  html = template.default;
}
