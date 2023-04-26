import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./bullet-list-ceg.component.html';

@Component({
  selector: 'app-bullet-list-ceg',
  templateUrl: './bullet-list-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: BulletListCegComponent }],
})
export class BulletListCegComponent implements StaticComponentExample {
  html = template.default;
}
