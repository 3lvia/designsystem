import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./icon-list-ceg.component.html';

@Component({
  selector: 'app-icon-list-ceg',
  templateUrl: './icon-list-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: IconListCegComponent }],
})
export class IconListCegComponent implements StaticComponentExample {
  html = template.default;
}
