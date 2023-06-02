import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./radiobutton-ceg.component.html';

@Component({
  selector: 'app-radiobutton-ceg',
  templateUrl: './radiobutton-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: RadiobuttonCegComponent }],
})
export class RadiobuttonCegComponent implements StaticComponentExample {
  html = template.default;
}
