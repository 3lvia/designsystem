import { Component } from '@angular/core';

import * as template from 'html-loader!./radiobutton-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-radiobutton-ceg',
  templateUrl: './radiobutton-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: RadiobuttonCegComponent }],
  standalone: true,
})
export class RadiobuttonCegComponent implements StaticComponentExample {
  html = template.default;
}
