import { Component } from '@angular/core';

import * as template from 'html-loader!./draganddrop-dragover-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-draganddrop-dragover-ceg',
  templateUrl: './draganddrop-dragover-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: DraganddropDragoverCegComponent }],
  standalone: true,
})
export class DraganddropDragoverCegComponent implements StaticComponentExample {
  html = template.default;
}
