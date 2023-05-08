import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./radiobutton-sm-ceg.component.html';

@Component({
  selector: 'app-radiobutton-sm-ceg',
  templateUrl: './radiobutton-sm-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: RadiobuttonSmCegComponent }],
})
export class RadiobuttonSmCegComponent implements StaticComponentExample {
  html = template.default;
}
