import { Component } from '@angular/core';

import * as template from './tag-signal-colored-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-tag-signal-colored-ceg',
  templateUrl: './tag-signal-colored-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: TagSignalColoredCegComponent }],
})
export class TagSignalColoredCegComponent implements StaticComponentExample {
  html = template.default;
}
