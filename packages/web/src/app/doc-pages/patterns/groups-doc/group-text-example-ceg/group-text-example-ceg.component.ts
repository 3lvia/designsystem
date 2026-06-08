import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';

import * as template from './group-text-example-ceg.component.html';
import { StaticComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
  selector: 'app-group-text-example-ceg',
  imports: [],
  templateUrl: './group-text-example-ceg.component.html',
  providers: [{ provide: StaticComponentExample, useExisting: GroupTextExampleCegComponent }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: `
    :host {
      display: contents;
      p {
        margin: 0;
      }
    }
  `,
})
export class GroupTextExampleCegComponent implements StaticComponentExample {
  html = template.default;
}
