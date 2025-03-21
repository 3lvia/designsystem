import { Component } from '@angular/core';

import * as template from './radiobutton-states-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-radiobutton-states-ceg',
  templateUrl: './radiobutton-states-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: RadiobuttonStatesCegComponent }],
})
export class RadiobuttonStatesCegComponent implements StaticComponentExample {
  html = template.default;
}
