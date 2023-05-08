import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./radiobutton-md-ceg.component.html';

@Component({
  selector: 'app-radiobutton-md-ceg',
  templateUrl: './radiobutton-md-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: RadiobuttonMdCegComponent }],
})
export class RadiobuttonMdCegComponent implements StaticComponentExample {
  html = template.default;
}
