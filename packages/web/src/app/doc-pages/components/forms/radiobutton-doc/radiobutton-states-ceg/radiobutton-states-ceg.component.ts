import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./radiobutton-states-ceg.component.html';

@Component({
  selector: 'app-radiobutton-states-ceg',
  templateUrl: './radiobutton-states-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: RadiobuttonStatesCegComponent }],
})
export class RadiobuttonStatesCegComponent implements StaticComponentExample {
  html = template.default;
}
