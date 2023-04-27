import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./tag-colored-ceg.component.html';

@Component({
  selector: 'app-tag-colored-ceg',
  templateUrl: './tag-colored-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TagColoredCegComponent }],
})
export class TagColoredCegComponent implements StaticComponentExample {
  html = template.default;
}
