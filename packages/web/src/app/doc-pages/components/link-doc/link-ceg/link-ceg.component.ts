import { Component } from '@angular/core';

import * as template from './link-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-link-ceg',
  templateUrl: './link-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: LinkCegComponent }],
})
export class LinkCegComponent implements StaticComponentExample {
  html = template.default;
}
