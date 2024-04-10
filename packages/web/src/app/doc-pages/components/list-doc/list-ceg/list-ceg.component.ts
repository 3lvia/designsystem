import { Component } from '@angular/core';

import * as template from './list-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-list-ceg',
  templateUrl: './list-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: ListCegComponent }],
  standalone: true,
})
export class ListCegComponent implements StaticComponentExample {
  html = template.default;
}
