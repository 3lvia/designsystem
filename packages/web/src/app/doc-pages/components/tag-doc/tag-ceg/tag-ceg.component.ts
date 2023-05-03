import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

import * as template from 'html-loader!./tag-ceg.component.html';

@Component({
  selector: 'app-tag-ceg',
  templateUrl: './tag-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TagCegComponent }],
})
export class TagCegComponent implements StaticComponentExample {
  html = template.default;
}
