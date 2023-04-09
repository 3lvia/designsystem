import { Component } from '@angular/core';
import { StaticCegContent } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./button-badge-ceg.component.html';

@Component({
  selector: 'app-button-badge-ceg',
  templateUrl: './button-badge-ceg.component.html',
  providers: [{ provide: StaticCegContent, useExisting: ButtonBadgeCegComponent }],
})
export class ButtonBadgeCegComponent implements StaticCegContent {
  html = template.default;
}
