import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./list-bullet-ceg.component.html';

@Component({
  selector: 'app-list-bullet-ceg',
  templateUrl: './list-bullet-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: BulletListCegComponent }],
})
export class BulletListCegComponent implements StaticComponentExample {
  html = template.default;
}
