import { Component } from '@angular/core';

import * as template from './list-bullet-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-list-bullet-ceg',
  templateUrl: './list-bullet-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: BulletListCegComponent }],
  standalone: true,
})
export class BulletListCegComponent implements StaticComponentExample {
  html = template.default;
}
