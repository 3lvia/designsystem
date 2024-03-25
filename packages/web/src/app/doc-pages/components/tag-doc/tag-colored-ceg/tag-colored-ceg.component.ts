import { Component } from '@angular/core';

import * as template from './tag-colored-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-tag-colored-ceg',
  templateUrl: './tag-colored-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TagColoredCegComponent }],
  standalone: true,
})
export class TagColoredCegComponent implements StaticComponentExample {
  html = template.default;
}
