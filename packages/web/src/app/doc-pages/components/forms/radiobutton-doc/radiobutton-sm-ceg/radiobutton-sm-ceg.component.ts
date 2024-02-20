import { Component } from '@angular/core';

import * as template from 'html-loader!./radiobutton-sm-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-radiobutton-sm-ceg',
  templateUrl: './radiobutton-sm-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: RadiobuttonSmCegComponent }],
  standalone: true,
})
export class RadiobuttonSmCegComponent implements StaticComponentExample {
  html = template.default;
}
