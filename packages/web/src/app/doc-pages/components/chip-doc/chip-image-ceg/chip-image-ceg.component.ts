import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';
import * as template from 'html-loader!./chip-image-ceg.component.html';

@Component({
  selector: 'app-chip-image-ceg',
  templateUrl: './chip-image-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ChipImageCegComponent }],
})
export class ChipImageCegComponent implements StaticComponentExample {
  html = template.default;
}
