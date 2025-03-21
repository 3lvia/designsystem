import { Component } from '@angular/core';

import * as template from './radiobutton-sm-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-radiobutton-sm-ceg',
  templateUrl: './radiobutton-sm-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: RadiobuttonSmCegComponent }],
})
export class RadiobuttonSmCegComponent implements StaticComponentExample {
  html = template.default;
}
