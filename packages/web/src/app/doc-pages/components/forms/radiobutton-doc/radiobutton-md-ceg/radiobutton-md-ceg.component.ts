import { Component } from '@angular/core';

import * as template from 'html-loader!./radiobutton-md-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-radiobutton-md-ceg',
  templateUrl: './radiobutton-md-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: RadiobuttonMdCegComponent }],
  standalone: true,
})
export class RadiobuttonMdCegComponent implements StaticComponentExample {
  html = template.default;
}
