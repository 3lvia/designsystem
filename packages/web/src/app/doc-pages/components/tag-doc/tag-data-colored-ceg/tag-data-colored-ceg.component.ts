import { Component } from '@angular/core';

import * as template from './tag-data-colored-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-tag-data-colored-ceg',
  templateUrl: './tag-data-colored-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TagDataColoredCegComponent }],
  standalone: true,
})
export class TagDataColoredCegComponent implements StaticComponentExample {
  html = template.default;
}
