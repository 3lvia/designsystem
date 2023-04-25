import { Component } from '@angular/core';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';
import * as template from 'html-loader!./outline-ceg.component.html';

@Component({
  selector: 'app-outline-ceg',
  templateUrl: './outline-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: OutlineCegComponent }],
})
export class OutlineCegComponent implements StaticComponentExample {
  html = template.default;
}
